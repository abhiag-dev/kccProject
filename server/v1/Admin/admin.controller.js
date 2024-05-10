const Admin = require("../../../models/sql/admin.js");

async function addAdmin(req, res) {
  try {
    const { id, email, password, adminName } = req.body;

    const newAdmin = await Admin.create({
      id,
      email,
      password,
      Admin_Name: adminName,
      Is_active: true,
      Last_Logged_In: null,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Failed to create admin" });
  }
}

async function editAdmin(req, res) {
  try {
    const { id } = req.body;
    const updates = req.body;

    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await admin.update(updates);

    res.json(admin);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ error: "Failed to update admin" });
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    admin.Last_Logged_In = new Date();
    await admin.save();

    res.json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Failed to login admin" });
  }
}

async function listAdmin(req, res) {
  try {
    const admins = await Admin.findAll();

    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
}

module.exports = {
  addAdmin,
  editAdmin,
  loginAdmin,
  listAdmin,
};
