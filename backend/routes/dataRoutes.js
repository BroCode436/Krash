const express = require("express");
const upload = require("../middleware/upload");

const {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} = require("../controllers/dataController");

const router = express.Router();

// CREATE (with file upload)
router.post("/", upload.single("file"), createData);

// READ
router.get("/", getAllData);
router.get("/:id", getDataById);

// UPDATE
router.put("/:id", updateData);

// DELETE
router.delete("/:id", deleteData);

module.exports = router;
