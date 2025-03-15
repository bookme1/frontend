'use client';

import React, { useEffect, useState } from 'react';

import styles from './LogsPage.module.css';
import { Webstatistics } from '@/components/Webstatistics';
import { removeLog } from '@/contexts/Logs/fetchDeleteLog';
import { useGetLogsQuery } from '@/lib/redux/features/logs/logsApi';

interface LogsInterface {}

const LogsPage: React.FC<LogsInterface> = () => {
    const [expandedRow, setExpandedRow] = useState<{ [key: string]: boolean }>(
        {}
    );

    const { data, error, isLoading, refetch } = useGetLogsQuery();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const toggleRow = (id: string) => {
        setExpandedRow(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const deleteLog = async (id: string) => {
        await removeLog(id);
        await refetch();
    };

    return (
        <div className={`wrapper ${styles.container}`}>
            <Webstatistics />
            <table className={styles.table}>
                <thead className={styles.th}>
                    <tr className={styles.tr}>
                        <th className={`${styles.th} ${styles.textSmall}`}>
                            id
                        </th>
                        <th className={styles.th}>source</th>
                        <th className={styles.th}>message</th>
                        <th className={styles.th} style={{ width: '400px' }}>
                            context
                        </th>
                        <th className={`${styles.th}`}>createdAt</th>
                        <th
                            className={`${styles.th}`}
                            style={{ width: '50px' }}
                        >
                            -
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr
                            style={{
                                fontSize: '32px',
                                fontWeight: '700',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <td colSpan={6} style={{ textAlign: 'center' }}>
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        data?.map(log => (
                            <tr key={log.id} className={styles.tr}>
                                <td
                                    className={`${styles.td} ${styles.textSmall}`}
                                    onClick={() => toggleRow(log.id)}
                                >
                                    <p className={styles.textSmall}>{log.id}</p>
                                </td>
                                <td
                                    className={`${styles.td} ${styles.textSmall}`}
                                    onClick={() => toggleRow(log.id)}
                                >
                                    <p className={styles.textSmall}>
                                        {log.source}
                                    </p>
                                </td>
                                <td
                                    className={`${styles.td} ${styles.textMedium}`}
                                    onClick={() => toggleRow(log.id)}
                                >
                                    <p
                                        className={styles.textMedium}
                                        style={{
                                            maxHeight: expandedRow[log.id]
                                                ? 'none'
                                                : '100px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {log.message}
                                    </p>
                                </td>
                                <td
                                    className={`${styles.td} ${styles.textLarge}`}
                                    onClick={() => toggleRow(log.id)}
                                >
                                    <p
                                        className={styles.textLarge}
                                        style={{
                                            maxHeight: expandedRow[log.id]
                                                ? 'none'
                                                : '100px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {log.context}
                                    </p>
                                </td>
                                <td
                                    className={`${styles.td} ${styles.textSmall}`}
                                    onClick={() => toggleRow(log.id)}
                                >
                                    <p className={styles.textSmall}>
                                        {log.createdAt}
                                    </p>
                                </td>

                                <td
                                    className={` ${styles.delRow} ${styles.td}`}
                                >
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteLog(log.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LogsPage;
