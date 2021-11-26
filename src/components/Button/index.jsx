import React from 'react';
import './index.scss';

export default function Button({ data }) {
    return (
        <div className="btn">
            <label className="switch">
                <input
                    type="checkbox"
                    ref={data.btnRef}
                    onClick={data.search}
                />
                <span className="slider round"></span>
            </label>
            <span>{data.text}</span>
        </div>
    );
}
