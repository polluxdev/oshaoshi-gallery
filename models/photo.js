const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Photo must have a name.']
    },
    imageUrl: {
      type: String,
      required: [true, 'Photo must have an image.']
    },
    member: {
      type: mongoose.Schema.ObjectId,
      ref: 'Member',
      required: [true, 'Photo must belong to a member']
    },
    description: {
      type: String,
      required: [true, 'Photo must have a description.'],
      minlength: 5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (val) => Math.round(val * 10) / 10
    },
    slug: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Photo must belong to a user']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

photoSchema.index({ rating: 1 });

photoSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'photo'
});

photoSchema.pre('save', function (next, req) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
