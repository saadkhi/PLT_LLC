const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial data...');

    // Create Jobs
    const job1 = await prisma.job.create({
        data: {
            title: 'Senior Full Stack Developer',
            location: 'Remote',
            job_mode: 'Remote',
            about_role: 'Join our team to lead innovative web projects.',
            responsibilities: 'Develop high-performance apps.',
            requirements: 'Experience with Next.js and Prisma.',
        },
    });

    // Create Industries
    await prisma.industry.createMany({
        data: [
            { name: 'Artificial Intelligence', description: 'Innovating with AI.', image: 'AI.png' },
            { name: 'Digital Marketing', description: 'Driving growth.', image: 'dig_market.png' },
        ],
    });

    // Create Insights
    await prisma.insight.createMany({
        data: [
            { title: 'The Future of AI', description: 'AI trends in 2026.', image: 'AI.png' },
        ],
    });

    // Create Categories
    const cat1 = await prisma.category.create({ data: { name: 'Web & App Development' } });

    // Create Projects
    const proj1 = await prisma.project.create({
        data: {
            categoryId: cat1.id,
            title: 'Global ERP System',
            description: 'A custom ERP for manufacturing.',
            link: 'https://example.com/erp',
            images: {
                create: [
                    { image: 'code.png', alt_text: 'Dashboard', order: 1 },
                ],
            },
        },
    });

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
