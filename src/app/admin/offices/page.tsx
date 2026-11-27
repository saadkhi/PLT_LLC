import { requireAdminPage } from '@/lib/adminAuth';
import OfficesClient from './OfficesClient';

export default async function Page() {
    await requireAdminPage();

    return <OfficesClient />;
}
