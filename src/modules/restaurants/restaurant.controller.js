const restaurantService = require('./restaurant.service');

class RestaurantController {
  async getAllRestaurants(req, res) {
    try {
      const restaurants = await restaurantService.getAllRestaurants();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch restaurants" });
    }
  }

  async createRestaurant(req, res) {
    try {
      const { name, category, rating } = req.body;
      if (!name || !category) {
        return res.status(400).json({ error: 'Name and category are required' });
      }
      const restaurant = await restaurantService.createRestaurant(req.body);
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create restaurant' });
    }
  }

  async getRestaurantById(req, res) {
    try {
      const restaurant = await restaurantService.getRestaurantById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
  }

  async updateRestaurant(req, res) {
    try {
      const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update restaurant' });
    }
  }

  async deleteRestaurant(req, res) {
    try {
      await restaurantService.deleteRestaurant(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete restaurant' });
    }
  }
}

module.exports = new RestaurantController();