import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/check-session", auth, (req, res) => {
    res.json({ loggedIn: true, user: req.user }); 
});

export default router;
