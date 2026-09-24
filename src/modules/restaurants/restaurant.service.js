const prisma = require('../../database/prisma');

class RestaurantService {
  async getAllRestaurants() {
    return prisma.restaurant.findMany();
  }

  async createRestaurant(data) {
    return prisma.restaurant.create({ data });
  }

  async getRestaurantById(id) {
    return prisma.restaurant.findUnique({ where: { id: parseInt(id) } });
  }

  async updateRestaurant(id, data) {
    return prisma.restaurant.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteRestaurant(id) {
    return prisma.restaurant.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = new RestaurantService();