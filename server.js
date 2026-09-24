require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./src/database/prisma');
const PORT = process.env.PORT || 3000;

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();