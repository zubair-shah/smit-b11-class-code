const mongoose = require("mongoose")

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    animal: {
      type: String,
      required: true,
      enum: ["dog", "cat", "bird", "rabbit", "reptile"],
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],

    // Additional fields for internal use (not exposed in API response)
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    age: {
      type: String,
      enum: ["baby", "young", "adult", "senior"],
      default: "adult",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    size: {
      type: String,
      enum: ["small", "medium", "large", "extra-large"],
      default: "medium",
    },

    // Health and behavior information
    vaccinated: {
      type: Boolean,
      default: false,
    },
    spayedNeutered: {
      type: Boolean,
      default: false,
    },
    houseTrained: {
      type: Boolean,
      default: false,
    },
    goodWithKids: {
      type: Boolean,
      default: true,
    },
    goodWithPets: {
      type: Boolean,
      default: true,
    },
    energyLevel: {
      type: String,
      enum: ["low", "moderate", "high", "very-high"],
      default: "moderate",
    },

    // Availability and adoption info
    isAvailable: {
      type: Boolean,
      default: true,
    },
    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    adoptedAt: {
      type: Date,
      default: null,
    },

    // Admin fields
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },

    // Special needs or notes
    specialNeeds: {
      type: String,
      maxlength: 500,
    },

    // Contact information for the shelter/rescue
    contactInfo: {
      organization: String,
      phone: String,
      email: String,
      website: String,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
petSchema.index({ animal: 1, isAvailable: 1 })
petSchema.index({ city: 1, state: 1 })
petSchema.index({ breed: 1 })
petSchema.index({ createdAt: -1 })
petSchema.index({ featured: -1, createdAt: -1 })

// Text index for search functionality
petSchema.index({
  name: "text",
  breed: "text",
  description: "text",
  city: "text",
  state: "text",
})

// Method to get API response format
petSchema.methods.toAPIResponse = function () {
  return {
    id: this._id,
    name: this.name,
    animal: this.animal,
    city: this.city,
    state: this.state,
    description: this.description,
    breed: this.breed,
    images: this.images,
  }
}

// Method to increment views
petSchema.methods.incrementViews = function () {
  this.views += 1
  return this.save()
}

// Static method to find available pets
petSchema.statics.findAvailable = function (filters = {}) {
  return this.find({ isAvailable: true, ...filters })
}
const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
