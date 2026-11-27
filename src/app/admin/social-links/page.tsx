import { requireAdminPage } from '@/lib/adminAuth';
import SocialLinksClient from './SocialLinksClient';

export default async function Page() {
    await requireAdminPage();

    return <SocialLinksClient />;
}
