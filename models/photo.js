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
      type: String
      // required: [true, 'Photo must have an image.']
    },
    // memberId: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Member'
    // },
    description: {
      type: String,
      required: [true, 'Photo must have a description.'],
      minlength: 5
    },
    rating: {
      type: Number,
      required: [true, 'Photo must have a rating'],
      min: 1,
      max: 5
    },
    slug: String
  },
  { toJSON: { virtual: true }, toObject: { virtual: true } },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

photoSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
