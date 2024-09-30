import { AppDataSource } from './typeOrm.config';

export async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database connected');
  }
}
