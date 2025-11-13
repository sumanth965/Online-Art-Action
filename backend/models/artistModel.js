import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
