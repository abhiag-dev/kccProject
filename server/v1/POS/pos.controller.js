const POS = require("../../../models/sql/POS.js");

async function addPOS(req, res) {
  try {
    const posData = req.body;

    const newPOS = await POS.create(posData);

    res.status(201).json(newPOS);
  } catch (error) {
    console.error("Error creating POS:", error);
    res.status(500).json({ error: "Failed to create POS" });
  }
}

async function listPOS(req, res) {
  try {
    const posList = await POS.findAll();

    res.json(posList);
  } catch (error) {
    console.error("Error fetching POS:", error);
    res.status(500).json({ error: "Failed to fetch POS" });
  }
}
async function editPOS(req, res) {
  try {
    const { id, pos_id, pos_name, pos_key, city, is_active } = req.body;

    const pos = await POS.findByPk(id);

    if (!pos) {
      return res.json({ error: "POS not found" });
    }

    await pos.update({
      pos_id,
      pos_name,
      pos_key,
      city,
      is_active,
    });

    res.json(pos);
  } catch (error) {
    console.error("Error updating POS:", error);
    res.status(500).json({ error: "Failed to update POS" });
  }
}

async function changePOSStatus(req, res) {
  try {
    const { id, is_active } = req.body;

    const pos = await POS.findByPk(id);
    if (!pos) {
      return res.status(404).json({ error: "POS not found" });
    }

    await pos.update({ is_active });

    res.json(pos);
  } catch (error) {
    console.error("Error changing POS status:", error);
    res.status(500).json({ error: "Failed to change POS status" });
  }
}

module.exports = {
  addPOS,
  listPOS,
  editPOS,
  changePOSStatus,
};
