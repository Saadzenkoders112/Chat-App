import 'dotenv/config';

import express from 'express';
import next from 'next';
// import { initializeDatabase } from  // Adjust the import path as necessary
import { initializeDatabase } from './src/app/api/lib/db';
const port = parseInt(process.env.PORT || '3001', 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

(async () => {
  try {
    await initializeDatabase();

    // Prepare the Next.js app
    await app.prepare();

    // Define routes or middleware for Express if needed

    // Let Next.js handle all other routes
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    // Start the Express server
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
      console.log("Server running")
    });
  } catch (error) {
    console.error('Error occurred while starting the server:', error);
    process.exit(1);
  }
})();
