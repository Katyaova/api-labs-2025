import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;



const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },

});



UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
};

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10;
  const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  try {
    if (!passwordValidator.test(this.password)) {
      throw new Error('Password must be at least 8 characters long and include at least one letter, one number, and one special character.');
    }
    if (this.isModified('password') || this.isNew) {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
    }
    next(); 
  } catch (err) {
    next(err); 
  }
});




export default mongoose.model('User', UserSchema);
