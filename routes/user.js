const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const user = { id: 1, mail: "test@mail.ru" };
    res.status(201).json(user);
});

module.exports = router;