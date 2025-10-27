import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { getArtworks, uploadArtwork, deleteArtwork, } from "../controllers/artworkController.js";

const router = express.Router();

router.get("/", getArtworks);
router.post("/", upload.single("image"), uploadArtwork);
router.delete("/:id", deleteArtwork);

export default router;
