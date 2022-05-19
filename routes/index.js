"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ message: "API OK!" });
});
router.get("/menu", (_, res) => {
    res.status(200).json({ message: "This is Menu" });
});
exports.default = router;
