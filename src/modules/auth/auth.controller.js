const AuthService = require('./auth.service');

class AuthController {
  async register(req, res) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMe(req, res) {
    try {
      const user = await AuthService.getMe(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();