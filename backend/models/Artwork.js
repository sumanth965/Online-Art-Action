import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema({
  title: String,
  category: String,
  basePrice: Number,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Artwork = mongoose.model("Artwork", artworkSchema);
export default Artwork;
