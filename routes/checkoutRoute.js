const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const cart = req.session.cart || [];
    res.render('checkout', { cart });
});

module.exports = router;
