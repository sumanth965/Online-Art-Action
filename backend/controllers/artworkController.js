import Artwork from "../models/Artwork.js";

// ✅ Get all artworks
export const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Upload artwork
export const uploadArtwork = async (req, res) => {
  try {
    const { title, category, basePrice, description } = req.body;

    const newArt = new Artwork({
      title,
      category,
      basePrice,
      description,
      image: req.file?.filename || null,
    });

    await newArt.save();
    res.status(201).json({ message: "Artwork uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete artwork
export const deleteArtwork = async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id);
    res.json({ message: "Artwork deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
