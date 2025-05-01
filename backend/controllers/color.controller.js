import { Color } from "../model/color.model.js";


export const createColor = async (req, res) => {
  try {
    const { colorName, color } = req.body || {};
    if (!colorName || !color) {
      return res.status(400).json({ message: "colorName and color are required" });
    }

    const newColor = await Color.create({ colorName, color });
    res.status(201).json({ message: "Color created", color: newColor });
  } catch (error) {
    console.log("create color error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({ createdAt: -1 });
    res.status(200).json(colors);
  } catch (error) {
    console.log("get all colors error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Color ID is required" });
    const { colorName, color } = req.body;

    const updated = await Color.findByIdAndUpdate(id, { colorName, color }, { new: true });
    if (!updated) return res.status(404).json({ message: "Color not found" });

    res.status(200).json({ message: "Color updated", color: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Color ID is required" });
    const deleted = await Color.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Color not found" });

    res.status(200).json({ message: "Color deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
