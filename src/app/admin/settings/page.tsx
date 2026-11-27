import { requireAdminPage } from '@/lib/adminAuth';
import SettingsClient from './SettingsClient';

export default async function Page() {
    await requireAdminPage();

    return <SettingsClient />;
}
