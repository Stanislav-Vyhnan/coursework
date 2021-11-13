import React from 'react';
import './index.css';
import Button from '../Button';

export default function SettingsSearch({
    regRef,
    strictRef,
    selFragmRef,
    search,
}) {
    const firstBtn = {
        btnRef: regRef,
        text: 'Ігнорування реєстру',
        search,
    };
    const secondBtn = {
        btnRef: strictRef,
        text: 'Строгий режим',
        search,
    };
    const ThirdBtn = {
        btnRef: selFragmRef,
        text: 'Виділення фрагменту',
        search,
    };
    return (
        <div className="settings">
            <Button {...firstBtn} />
            <Button {...secondBtn} />
            <Button {...ThirdBtn} />
        </div>
    );
}
