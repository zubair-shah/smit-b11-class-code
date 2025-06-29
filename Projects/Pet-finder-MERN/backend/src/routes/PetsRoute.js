const express = require("express");
const router = express.Router();
const Pet = require("../models/Pets");
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pets/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("uniqueSuffix", uniqueSuffix);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Get all pets for users (with full details)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, animal, status } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { breed: { $regex: search, $options: "i" } },
        { animal: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } },
      ];
    }

    if (animal && animal !== "all") {
      query.animal = animal.toLowerCase();
    }

    if (status && status !== "all") {
      query.isAvailable = status === "available";
    }

    const pets = await Pet.find(query)
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Pet.countDocuments(query);

    // Format pets for admin view (include all fields)
    const formattedPets = pets.map((pet) => ({
      id: pet._id,
      name: pet.name,
      animal: pet.animal,
      breed: pet.breed,
      city: pet.city,
      state: pet.state,
      price: pet.price,
      age: pet.age,
      gender: pet.gender,
      size: pet.size,
      status: pet.isAvailable ? "available" : "adopted",
      images: pet.images,
      createdAt: pet.createdAt,
      addedBy: pet.addedBy,
      views: pet.views,
    }));

    res.json({
      pets: formattedPets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Get pets error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.status(404).json({ message: "Pet not Found" });
    }

    res.json(pet.toAPIResponse());
  } catch (error) {
    console.error("Get pets error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new pet
router.post("/pets", protect, upload.array("images"), async (req, res) => {
  console.log("req.userId:", req.userId); // e.g. name, description
  console.log("Text fields:", req.body); // e.g. name, description
  console.log("Uploaded file:", req.file); // multer gives you file info
  try {
    const petData = {
      ...req.body,
      addedBy: req.userId,
      animal: req.body.animal?.toLowerCase(),
      state: req.body.state?.toUpperCase(),
      images: req.files?.map(
        (file) => `http://localhost:4001/uploads/pets/${file.filename}`
      ),
    };

    console.log("petData.images", petData.images);
    const pet = new Pet(petData);
    await pet.save();

    res.status(201).json({
      message: "Pet created successfully",
      pet: pet.toAPIResponse(),
    });
  } catch (error) {
    console.error("Create pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/pets/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    if (!petId) {
      res.status(400).json({ message: "Pet Id Required" });
    }

    const pet = await Pet.findByIdAndDelete(petId);
    if (!pet) {
      res.status(400).json({ message: "Pet Not Found" });
    }
    res.status(201).json({
      message: "Pet Deleted successfully",
    });
  } catch (error) {
    console.error("Delete pet error:", error);
  }
});

module.exports = router;
