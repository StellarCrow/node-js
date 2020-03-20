const express = require('express');
const router = express.Router();
const UserService = require('../../services/UserService');

router.delete('/delete-user', async (req, res) => {
    const user = req.user;
    if(!user) {
        return res.status(401).json({message: "Unauthorized user", deleted_user: null});
    }
    const deletedUser = await UserService.deleteUser(user);
    return res.status(200).json({deleted_user: deletedUser});
})


module.exports = router;