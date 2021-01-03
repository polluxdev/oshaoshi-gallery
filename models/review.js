const mongoose = require('mongoose');

const Photo = require('./photo');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment can not be empty!']
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be below 5']
    },
    photo: {
      type: mongoose.Schema.ObjectId,
      ref: 'Photo',
      required: [true, 'Review must belong to a photo']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name'
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (photoId) {
  const stats = await this.aggregate([
    { $match: { photo: photoId } },
    {
      $group: {
        _id: '$photo',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Photo.findByIdAndUpdate(photoId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Photo.findByIdAndUpdate(photoId, {
      ratingsQuantity: 0,
      ratingsAverage: 0
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.photo);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRatings(this.review.photo);
});

reviewSchema.pre(/Many$/, async function (next) {
  this.review = await this.findOne();
  next();
})

reviewSchema.post(/Many$/, async function (res) {
  await this.review.constructor.calcAverageRatings(this.review.photo);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
