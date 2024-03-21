const utils = require('../utils/utils')
const userModel = require('../model/user_model')
const bcrypt = require('bcrypt');

const UserServices = {
  createAccount: async function (name, email, password) {
    try {

      // Check if user is already present
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return utils.getErrorResponse({ message: "Email already Exists" }, 409);
      }

      // Create new user

      const user = new userModel({ name, email, password })

      await user.save();

      return { status: true,  statusCode: 200, data: user, message: 'User Created Successfully', error: null}

    } catch (e) {
      console.log(e);
      return utils.getErrorResponse({
        message: e.message
      }, 500);
    }
  },

  signIn: async function (email, password) {
    try {

      const existingUser = await userModel.findOne({ email });

      if (!existingUser) {
        return utils.getErrorResponse({ message: "User doesn't exists" }, 404)
      }

      // compare the entered password with the hashed password stored in the database

      const isPassValid = await bcrypt.compare(password, existingUser.password);

      if (!isPassValid) {
        return utils.getErrorResponse({ message: "Password doesn't matched" }, 401);
      }

      return {
        status: true,
        statusCode: 200,
        data: existingUser,
        message: 'Successfully Logged-In',
        error: null
      }

    } catch (e) {
      return utils.getErrorResponse({
        message: e.message
      }, 500);
    }
  }
}

module.exports = UserServices;