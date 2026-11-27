import prisma from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';
import { requireAdminPage } from '@/lib/adminAuth';

export default async function NewProjectPage() {
    await requireAdminPage();

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Create New Project</h2>
            <ProjectForm categories={categories} />
        </div>
    );
}
