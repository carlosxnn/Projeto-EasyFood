const prisma = require('../../database/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(data) {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  }

  async login(data) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return { token };
  }

  async getMe(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }
}

module.exports = new AuthService();