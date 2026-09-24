const express = require('express');
const restaurantController = require('./restaurant.controller');
const authMiddleware = require('../auth/auth.middleware');
const router = express.Router();

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', authMiddleware, restaurantController.createRestaurant);
router.put('/:id', authMiddleware, restaurantController.updateRestaurant);
router.delete('/:id', authMiddleware, restaurantController.deleteRestaurant);

module.exports = router;