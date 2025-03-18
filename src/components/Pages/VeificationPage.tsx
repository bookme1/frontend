'use client';

import React from 'react';

import { IUser } from '@/lib/redux/features/user/types';

import ErrorBoundary from '../Error/ErrorBoundary';
import { LeftMenu } from '../account/LeftMenu';
import Verify from '../account/Verify/Verify';
import { BreadCrumbs } from '../common/BreadCrumbs';

interface VeificationPageProps {
    user: IUser | null;
}
const VeificationPage: React.FC<VeificationPageProps> = ({ user }) => {

    return (
        <div
            className="wrapper"
            style={{ marginBottom: '20px', marginTop: '20px' }}
        >
            <ErrorBoundary>
                <BreadCrumbs name="акаунт" />
                <div
                    style={{ marginTop: '20px', display: 'flex', gap: '20px' }}
                >
                    <LeftMenu
                        username={user?.username}
                        isVerified={user?.verified}
                        isVerified={user?.verified}
                    />
                    <Verify  />
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default VeificationPage;
