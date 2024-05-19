const RiderLocation = require("../models/riderlocation");
const User = require("../models/user");

exports.createRiderLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { latitude, longitude } = req.body;

    const existingRecord = await RiderLocation.findOne({
      user: req.user.id,
    });

    // if (existingRecord) {
    //   return res.status(400).json({ message: "record should be updated" });
    // }

    if (existingRecord) {
      await RiderLocation.updateOne(
        { user: userId },
        {
          $set: {
            latitude,
            longitude,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Rider location updated successfully",
      });
    } else {
      const riderloc = await RiderLocation.create({
        user: req.user.id,
        latitude,
        longitude,
      });
      return res.status(201).json({
        success: true,
        message: "Rider location created successfully",
        riderloc,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
