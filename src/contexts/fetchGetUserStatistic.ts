import { userStatisticDTO } from '@/lib/redux/features/admin/types';


export async function fetchGetUserStatistic(): Promise<userStatisticDTO | void> {

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL || ''}/api/admin/getUserStatistic`,
            {
                method: 'GET',
                cache: 'no-cache',
            }
        );

        if (response.ok) {
            return await response.json();
        }

        ;
    } catch (error) {
        console.error('Error fetching user data:', error);

    }
}