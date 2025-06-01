const express = require("express");
const router = express.Router();
const Pet = require("../models/Pets");

// Get all pets for admin (with full details)
router.get("/pets", async (req, res) => {
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

// Create new pet
router.post("/pets", async (req, res) => {
  console.log("user", req.user);
  try {
    const petData = {
      ...req.body,
      //   addedBy: req.user.userId,
      animal: req.body.animal?.toLowerCase(),
      state: req.body.state?.toUpperCase(),
    };

    // Handle uploaded images
    // if (req.files && req.files.length > 0) {
    //   petData.images = req.files.map((file) => `http://localhost:5000/uploads/pets/${file.filename}`)
    // }

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

module.exports = router;
