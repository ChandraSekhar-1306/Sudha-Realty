import { PrismaClient } from '@prisma/client';
import { config } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: config.database.url,
      },
    },
  });

if (config.nodeEnv !== 'production') globalForPrisma.prisma = prisma;




