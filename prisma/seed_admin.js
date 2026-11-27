// Creates the first admin user, or resets its password.
// Usage: ADMIN_USERNAME=admin ADMIN_PASSWORD='a long password' node prisma/seed_admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = (process.env.ADMIN_USERNAME || 'admin').trim();
    const password = (process.env.ADMIN_PASSWORD || '').trim();

    if (password.length < 10) {
        throw new Error('Set ADMIN_PASSWORD (at least 10 characters) before running this script.');
    }

    const hashed = await bcrypt.hash(password, 12);
    const admin = await prisma.adminUser.upsert({
        where: { username },
        update: { password: hashed },
        create: { username, password: hashed },
    });
    console.log('Admin user ensured:', admin.username);
}

main()
    .catch((e) => {
        console.error(e.message || e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
