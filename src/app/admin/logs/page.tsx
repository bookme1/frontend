import LogsPage from '@/components/Pages/Admin/LogsPage';
import { getLogs } from '@/contexts/Logs/fetchGetLogs';

export default async function Home() {

    return <LogsPage />;
}
