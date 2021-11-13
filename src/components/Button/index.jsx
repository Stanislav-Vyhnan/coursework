import React from 'react';
import './index.css';

export default function Button({ btnRef, text, search }) {
    return (
        <div className="btn">
            <label className="switch">
                <input type="checkbox" ref={btnRef} onClick={search} />
                <span className="slider round"></span>
            </label>
            <span>{text}</span>
        </div>
    );
}
