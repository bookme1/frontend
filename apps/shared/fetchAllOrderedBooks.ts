import { addLogEntry } from "@/contexts/Logs/fetchAddLog";
import { IOrderBook } from "@/lib/redux/features/order/types";




export async function fetchAllOrderedBooks(url: string | undefined): Promise<IOrderBook[] | null> {

    const backendUrl = url;

    const cookies = document.cookie;
    try {
        const response = await fetch(
            `${backendUrl || ''}/api/order/orderedBooks`,
            {
                method: 'GET',
                headers: { cookie: cookies || '' },
                cache: 'no-cache',
            }
        );

        if (response.ok) {
            return await response.json();
        }

        return null;
    } catch (error) {
        console.error('Error fetching:', error);
        await addLogEntry({
            source: 'function fetchAllOrderedBooks()',
            message: `'Error fetching:', ${error}`,
            context: '',
            code: 0,
        });
        return null;
    }
}
