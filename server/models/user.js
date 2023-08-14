const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength:[2, 'Username has to be atleast 2 characters']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true })


UserSchema.virtual('confirmPassword')
    .get(() => {
        // console.log(this.confirmPassword);
        return this.confirmPassword
    })
    .set(value => this.confirmPassword = value);


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        console.log(this.password, " ", this.confirmPassword);
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// this should go after 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


module.exports = mongoose.model("User", UserSchema)