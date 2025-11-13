import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Artist from "../models/artistModel.js";

// Register Artist
export const registerArtist = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingArtist = await Artist.findOne({ email });
        if (existingArtist)
            return res.status(400).json({ success: false, message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await Artist.create({ email, password: hashedPassword });

        res.json({ success: true, message: "Artist registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Login Artist
export const loginArtist = async (req, res) => {
    try {
        const { email, password } = req.body;

        const artist = await Artist.findOne({ email });
        if (!artist)
            return res.status(400).json({ success: false, message: "User not found" });

        const valid = await bcrypt.compare(password, artist.password);
        if (!valid)
            return res.status(401).json({ success: false, message: "Invalid password" });

        const token = jwt.sign({ id: artist._id }, process.env.JWT_SECRET || "secret123", {
            expiresIn: "1d",
        });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
