import prisma from './prisma';

export async function getGlobalData() {
    try {
        const offices = await prisma.office.findMany({
            orderBy: { is_main: 'desc' }
        });
        const socialLinks = await prisma.socialLink.findMany({
            orderBy: { id: 'asc' }
        });

        // Ensure data is POJO-compliant for Next.js serialization between Server and Client components
        return JSON.parse(JSON.stringify({
            offices: offices,
            socialLinks: socialLinks,
            mainOffice: offices.find((o) => o.is_main) || offices[0] || null
        }));
    } catch (error) {
        console.error('Error fetching global data:', error);
        return {
            offices: [],
            socialLinks: [],
            mainOffice: null
        };
    }
}
