import React, { useRef, useEffect } from 'react';
import './index.css';
import checkRef from './checkRef';
import SettingsSearch from '../SettingsSearch';

export default function WriteTxt() {
    const textRef = useRef(null);
    const fragmentRef = useRef(null);
    const regRef = useRef(false);
    const strictRef = useRef(false);
    const selFragmRef = useRef(false);

    useEffect(() => textRef.current.focus());
    const search = () => {
        const textSplited = textRef.current.textContent
            .replace(/([.?!])\s*(?=[A-ZА-ЯІ])/g, '$1|')
            .split('|');
        const fragment = fragmentRef.current.value;
        if (fragment === '') return;
        const result = textSplited.map((el) => {
            return checkRef(el, fragment, [
                regRef.current.checked,
                strictRef.current.checked,
                selFragmRef.current.checked,
            ]);
        });
        textRef.current.innerHTML = result.join(' ');
    };
    const reset = () => {
        const text = textRef.current.textContent;
        textRef.current.innerHTML = text;
    };

    return (
        <main>
            <div>
                <b>Введіть текст:</b>
                <div
                    id="inputTxt"
                    className="writeTxt"
                    ref={textRef}
                    contentEditable="true"
                />
            </div>
            <div className="serch">
                <b>Налаштування пошуку</b>
                <SettingsSearch
                    {...{ regRef, strictRef, selFragmRef, search }}
                />
                <input
                    placeholder="Введіть фрагмент"
                    ref={fragmentRef}
                    onInput={search}
                    onClick={search}
                    onBlur={reset}
                />
                <button onClick={search}>Search</button>
            </div>
        </main>
    );
}
