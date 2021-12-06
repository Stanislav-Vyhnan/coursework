import React from 'react';
import './index.scss';
import Button from '../Button';

export default function SettingsSearch({ regRef, strictRef, funcs }) {
    const [search, reset] = funcs;
    const dataSettings = [
        {
            id: 1,
            data: { btnRef: regRef, text: 'Ігнорування реєстру', search },
        },
        {
            id: 2,
            data: { btnRef: strictRef, text: 'Строгий режим', search },
        },
    ];

    return (
        <div className="settings">
            {dataSettings.map((el) => (
                <Button key={el.id} data={el.data} />
            ))}
            <div className="btnReset">
                <button onClick={reset}>Reset All</button>
            </div>
        </div>
    );
}
