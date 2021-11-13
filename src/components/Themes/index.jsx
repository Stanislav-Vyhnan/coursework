import React from 'react';
import styles from './index.module.css';

export default function Themes() {
    return (
        <div className={styles.themes}>
            <button>Themes</button>
            <div className={styles.list}>
                <p>Orange</p>
                <p>Green</p>
                <p>Default</p>
            </div>
        </div>
    );
}
