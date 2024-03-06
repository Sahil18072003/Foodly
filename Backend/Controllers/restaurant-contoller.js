const Restaurant = require("./../Models/Restaurant-model");

const addRestaurant1 = async (req, res) => {
  try {
    const {
      resname,
      resadd,
      rescontact,
      reslandline,
      ownercontact,
      ownername,
      owneremail,
    } = req.body;

    const restaurantData = await Restaurant.create({
      resname,
      resadd,
      rescontact,
      reslandline,
      ownercontact,
      ownername,
      owneremail,
    });

    console.log(restaurantData);

    res.status(200).send({ msg: "Form successfully submitted", restaurantData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const addRestaurant2 = () => {};

const addRestaurant3 = () => {};

module.exports = {
  addRestaurant1,
  addRestaurant2,
  addRestaurant3,
};
