const router = require("express").Router();
const Booking = require("../models/booking.model");
const Event = require("../models/event.model");

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("event")
      .populate("user", "-password");
    res.json(bookings);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Get bookings for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("event")
      .populate("user", "-password");
    res.json(bookings);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { eventId, userId, quantity, totalPrice } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json("Event not found");
    }

    const newBooking = new Booking({
      event: eventId,
      user: userId,
      quantity,
      totalPrice,
      bookingDate: new Date(),
    });

    const savedBooking = await newBooking.save();

    // Populate the saved booking with event and user details
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate("event")
      .populate("user", "-password");

    res.json(populatedBooking);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Cancel a booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json("Booking not found");
    }
    res.json("Booking cancelled successfully");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
