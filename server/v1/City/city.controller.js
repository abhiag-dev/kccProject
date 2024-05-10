const City = require("../../../models/sql/city.js");
async function addCity(req, res) {
  try {
    const { city_name, is_active } = req.body;

    const newCity = await City.create({
      city_name,
      is_active: is_active !== undefined ? is_active : true,
    });

    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ error: "Failed to add city" });
  }
}

async function listCity(req, res) {
  try {
    const cities = await City.findAll();

    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
}

async function changeCityStatus(req, res) {
  try {
    const { id } = req.body;
    const { is_active } = req.body;

    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    await city.update({ is_active });

    res.json(city);
  } catch (error) {
    console.error("Error changing city status:", error);
    res.status(500).json({ error: "Failed to change city status" });
  }
}

module.exports = {
  addCity,
  listCity,
  changeCityStatus,
};
