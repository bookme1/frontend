import { useEffect } from 'react';

import { useDispatch, useSelector } from '@/lib/redux';
import { useGetDataMutation } from '@/lib/redux/features/user/userApi';
import {
    addUserData,
    selectUserData,
} from '@/lib/redux/features/user/userSlice';

const MAX_AGE_MS = 3 * 60 * 60 * 1000; // 3 hours for access

export const useUserSync = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const [getUserData] = useGetDataMutation();

    useEffect(() => {
        const now = Date.now();

        const shouldRefetch =
            !user?.id ||
            !user.lastFetchedAt ||
            now - user.lastFetchedAt > MAX_AGE_MS;

        if (shouldRefetch) {
            getUserData()
                .unwrap()
                .then(res => {
                    dispatch(addUserData({ ...res.user, lastFetchedAt: now }));
                })
                .catch(() => {
                    // optionally clearUserData()
                });
        }
    }, []);
};
