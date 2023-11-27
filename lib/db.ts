import { PrismaClient } from '@prisma/client';

export const db = createPrismaClient();

function createPrismaClient(): PrismaClient {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({
      // log: [{ emit: 'stdout', level: 'query' }],
    });
  }
  return globalThis.prismaClient;
}
