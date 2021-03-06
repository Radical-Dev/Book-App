const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  favouriteCats: {
    type: [String]
  },
  favouriteAuthor: {
    type: [String]
  },
  favouriteQuote: {
    type: String
  },
  bookShelf: [
    {
      title: {
        type: String
      },
      thumbnail: {
        type: String
      },
      status: {
        type: String
      },
      id: {
        type: String
      }
    }
  ],
  friends: [{ type: Schema.Types.ObjectId, ref: 'profile' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
