import { addLog } from "@/lib/redux/features/logs/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '';

export async function addLogEntry({
    source,
    message,
    context,
    code,
}: {
    source: string;
    message: string;
    context: string;
    code: number;
}): Promise<addLog | null> {
    try {
        const response = await fetch(`${BASE_URL}/api/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source,
                message,
                context,
                code,
            }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error adding log:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error adding log:', error);
        return null;
    }
}