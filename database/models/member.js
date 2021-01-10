const mongoose = require('../connection');

const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Member must have a name.']
    },
    imageUrl: String,
    birtDate: {
      type: Date,
      required: [true, 'Member must have birth date.']
    },
    generation: {
      type: Number,
      required: [true, 'Member must have generation.']
    },
    nickname: {
      type: String,
      required: [true, 'Member must have a nickname.']
    },
    status: {
      type: String,
      enum: ['active', 'graduated'],
      default: 'active'
    }
  },
  { timestamps: true }
);

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
