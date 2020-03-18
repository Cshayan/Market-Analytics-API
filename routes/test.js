// Bring in required dependencies
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json({
          message: 'Working fine too'
      })
});

module.exports = router;