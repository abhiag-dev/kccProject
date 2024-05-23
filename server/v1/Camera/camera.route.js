const express = require('express');
const router = express.Router();
const cameraController = require('./camera.controller.js');

router.post('/add-camera', cameraController.addCamera);
router.get('/list-cameras', cameraController.listCameras);
router.post('/get-cameras', cameraController.getCameraDetails);
module.exports = router;