// Lists admin users without printing password hashes.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const users = await prisma.adminUser.findMany({ select: { id: true, username: true } });
    console.log('Current Admin Users:', JSON.stringify(users, null, 2));
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
