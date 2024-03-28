const userServices = require('../services/user_services')
const utils = require('../utils/utils')

const userController = {

    createAccount: async function (req, res) {

        const { name, email, password } = req.body;

        // Check if field is null
        if (email == undefined) {
            res.status(400).json(utils.getErrorResponse({ message: 'Please fill email field' }));
            return;
        } else if (password == undefined) {
            res.status(400).json(utils.getErrorResponse({ message: 'Please fill password field' }));
            return;
        }

        const result = await userServices.createAccount(name, email, password);

        res.status(result.statusCode).json(result);


    },


    signIn: async function (req, res) {
        try {
            const { email, password } = req.body;

            // Check if field is null
            if (email == undefined) {
                res.status(400).json(utils.getErrorResponse({ message: 'Please fill email field' }));
                return;
            } else if (password == undefined) {
                res.status(400).json(utils.getErrorResponse({ message: 'Please fill password field' }));
                return;
            }

            const result = await userServices.signIn(email, password);

            res.status(result.statusCode).json(result);

        } catch (e) {
            console.log(e.message);
        }
    },

    updateDetail: async function (req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;

            const result = await userServices.updateDetail(userId, updateData);

            res.status(result.statusCode).json(result);

        } catch (e) {

        }
    }

}

module.exports = userController;