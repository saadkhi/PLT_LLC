import prisma from './prisma';

export async function getGlobalData() {
    try {
        const offices = await (prisma as any).office.findMany({
            orderBy: { is_main: 'desc' }
        });
        const socialLinks = await (prisma as any).socialLink.findMany({
            orderBy: { id: 'asc' }
        });

        return {
            offices: offices as any[],
            socialLinks: socialLinks as any[],
            mainOffice: offices.find((o: any) => o.is_main) || offices[0] || null
        };
    } catch (error) {
        console.error('Error fetching global data:', error);
        return {
            offices: [],
            socialLinks: [],
            mainOffice: null
        };
    }
}
