import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    Phone: {
        type: String,
    },

    address: {
        type: String,
    },

}, { timestamps: true });


UserSchema.pre("save", async function (next) {

    // if (!this.isModified("password")) {
    //     return ;
    // }

    this.password = await bcrypt.hash(this.password, 10);
next

});


UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model("User", UserSchema);

export default User;