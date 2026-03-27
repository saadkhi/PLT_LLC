const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const users = await prisma.adminUser.findMany();
    console.log('Current Admin Users:', JSON.stringify(users, null, 2));
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
