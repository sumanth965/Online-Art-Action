import express from "express";
import { registerArtist, loginArtist } from "../controllers/artistController.js";

const router = express.Router();

router.post("/register", registerArtist);
router.post("/login", loginArtist);

export default router;
