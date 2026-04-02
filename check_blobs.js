const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('--- Categories ---');
        const categories = await prisma.category.findMany();
        categories.forEach(c => {
            if (c.image && c.image.includes('blob.vercel-storage.com')) {
                console.log(`Category ${c.name}: ${c.image}`);
            }
        });

        console.log('--- Projects ---');
        const projects = await prisma.project.findMany({ include: { images: true } });
        projects.forEach(p => {
            p.images.forEach(i => {
                if (i.image && i.image.includes('blob.vercel-storage.com')) {
                    console.log(`Project ${p.title}: ${i.image}`);
                }
            });
        });

        console.log('--- Insights ---');
        const insights = await prisma.insight.findMany();
        insights.forEach(i => {
            if (i.image && i.image.includes('blob.vercel-storage.com')) {
                console.log(`Insight ${i.title}: ${i.image}`);
            }
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
