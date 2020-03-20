const express = require('express');
const router = express.Router();

router.get('/registration', (req, res) => {
    res.json({registration: "registration"});
})



module.exports = router;