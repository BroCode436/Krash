const Data = require("../models/Data");

exports.createData = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "title and description required" });
    }

    const data = await Data.create({ title, description });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllData = async (req, res) => {
  try {
    const allData = await Data.find().sort({ createdAt: -1 });
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getDataById = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};
exports.updateData = async (req, res) => {
  try {
    const updated = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const deleted = await Data.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};
