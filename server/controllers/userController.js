const asynHandler = require("express-async-handler");
const {
    UserModel,
    updateUserValidation
} = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const { PostModal } = require("../models/PostModal");
const { CommentModel } = require("../models/CommentModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/** 
 * @desc get all users 
 * @route api/users/profile
 * @method Get
 * @access private(only admin) 
*/

const getAllUsersCtrl = asynHandler(
    async (req, res) => {
        // get all users without [password] and populate posts
        const allUsers = await UserModel.find().select("-password").populate("posts");
        res.status(200).json(allUsers);
    }
);

/*===========================================*/

/**
 * @desc get user
 * @route api/users/profile/:id
 * @method Get
 * @access private(only admin and user himeself) 
*/

const getUserCtrl = asynHandler(
    async (req, res) => {

        // 1. get single user by id , without [password] and populate posts
        const user = await UserModel.findById(req.params.id)
            .select("-password")
            .populate("posts");

        // 2. check if the user not found , show user not found error msg
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // 3. send response to client
        res.status(200).json(user);
    }
);

/*===========================================*/

/**
 * @desc update user
 * @route api/users/profile/:id
 * @method Put
 * @access private(only admin and user himeself) 
*/

const updateUserCtrl = asynHandler(
    async (req, res) => {
        // 1. validation
        const { error } = updateUserValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. in case user changed his password , hash the password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        // 3. update user
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                bio: req.body.bio && req.body.bio,//if user fill the bio field
                userImage: req.file && req.file.originalname ? req.file.filename : undefined,
            }
        }, { new: true });

        // 4. send response to client
        res.status(200).json(updateUser);
    }
);

/*===========================================*/

/**
 * @desc delete user
 * @route api/users/profile/:id
 * @method Delete
 * @access private (only admin and user himeself) 
*/

const deleteUserCtrl = asynHandler(
    async (req, res) => {
        // 1. get single user by id from db
        const user = await UserModel.findById(req.params.id);

        // 2. if user exists , delte it and show success msg, otherwise show user not found error msg
        if (user) {
            await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "user has been deleted successfully" });
        } else {
            res.status(404).json({ message: "user not found" });
        }
    }
);

/*===========================================*/

/**
 * @desc  get user count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
*/

const getUsersCountCtrl = asynHandler(
    async (req, res) => {
        // get user count for admin dashboard
        const count = await UserModel.countDocuments();
        res.status(200).json(count);
    }
);

/*===========================================*/

/**
 * @desc  delete user profile (Account)
 * @route   /api/users/profile/:id
 * @method  Delete
 * @access  private (only admin or user himself)
*/

const deleteUserProfileCtrl = asynHandler(
    async (req, res) => {
        // 1. get the user from db
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        // 2. get all posts from db
        const posts = await PostModal.find({ user: user._id });

        // 3. delte user posts and comments in case the user already delete his account
        await PostModal.deleteMany({ user: user._id });
        await CommentModel.deleteMany({ user: user._id });

        // 4. delte the user himself
        await UserModel.findByIdAndDelete(req.params.id);

        // 5. send a response to the client
        res.status(200).json({ message: "your profile has been deleted" });
    }
);

module.exports = {
    getAllUsersCtrl,
    getUserCtrl,
    updateUserCtrl,
    deleteUserCtrl,
    getUsersCountCtrl,
    deleteUserProfileCtrl,
}