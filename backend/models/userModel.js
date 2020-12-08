//DATABASE SCHEMA FOR USERS
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Product = require('./productModel')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    
},{
    timestamps: true
})


//BEFORE SAVING THE USER, HASH THE PASSWORD
userSchema.pre('save',async function(next){
    //IF THIS MIDDLEWEAR IS REACHED FOR UPDATE AND PASSWORD IS NOT MODIFIED, CONTINUE
    if(!this.isModified('password')){
        next()
    }
    //ELSE HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

//LOCAL METHOD TO CHECK WHETHER THE ENTERED PASSWORD AND THE HASHED PASSWORD STORED IN DATABASE ARE SAME 
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('User',userSchema);
 