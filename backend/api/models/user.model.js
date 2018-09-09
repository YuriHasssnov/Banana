const { mongoose } = require('../../config');
const mongoosePaginate = require('mongoose-paginate');

let UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
},
  {
    collection: 'users'
  });

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);
module.exports = User;                                                                                                                                      