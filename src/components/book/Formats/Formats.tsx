import styled from '@emotion/styled';

import styles from './Formats.module.css';

const Formats = ({
    epub,
    pdf,
    mobi,
}: {
    epub: boolean;
    pdf: boolean;
    mobi: boolean;
}) => {
    function onFormatClicked(evt: any) {
        evt.currentTarget.classList.toggle('active');
    }

    return (
        <div className={styles.formatSection}>
            <p className={styles.formatTitle}>Формати:</p>
            <ul className={styles.formatList}>
                <li className={styles.formatItem}>
                    <button
                        className={`${!pdf ? 'disabled' : ''} ${styles.formatButton}`}
                        disabled={!pdf}
                        data-format="pdf"
                        onClick={evt => {
                            onFormatClicked(evt);
                        }}
                    >
                        Pdf
                    </button>
                </li>
                <li className={styles.formatItem}>
                    <button
                        className={`${!epub ? 'disabled' : ''} ${styles.formatButton}`}
                        disabled={!epub}
                        onClick={evt => {
                            onFormatClicked(evt);
                        }}
                        data-format="epub"
                    >
                        Epub
                    </button>
                </li>
                <li className={styles.formatItem}>
                    <button
                        className={`${!mobi ? 'disabled' : ''}  ${styles.formatButton}`}
                        disabled={!mobi}
                        onClick={evt => {
                            onFormatClicked(evt);
                        }}
                        data-format="mobi"
                    >
                        Mobi
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Formats;
