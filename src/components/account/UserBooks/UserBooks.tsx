import { useEffect, useState } from 'react';

import { IUser } from '@/lib/redux/features/user/types';

export default function UserBooks({
  userData,
}: {
  userData: IUser | undefined;
}) {
  return <>{userData}</>;
}
