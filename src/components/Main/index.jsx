import React, { useRef, useEffect, useState } from 'react';
import './index.scss';

import checkRef from './checkRef';
import SettingsSearch from '../SettingsSearch';
import InputText from '../InputText';
import FragmentTxt from '../FragmentTxt';

export default function WriteTxt() {
    const textRef = useRef(null);
    const fragmentRef = useRef(null);

    const [resetCheck, setReset] = useState(0);

    const [inputFocus, setFocus] = useState(false);

    const regRef = useRef(false);
    const strictRef = useRef(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        const text = localStorage.getItem('text');
        const [toCase, strictMode] = data.refs;

        if (data !== null) {
            regRef.current.checked = toCase;
            strictRef.current.checked = strictMode;
            fragmentRef.current.value = data.fragment;
        }
        if (text !== null) {
            textRef.current.innerHTML = text;
        }
    }, [resetCheck]);

    const search = () => {
        if (inputFocus) return;

        const refChecked = [regRef.current.checked, strictRef.current.checked];

        const fragment = fragmentRef.current.value;

        if (fragment === '') {
            setLocalStorage(fragment, refChecked);
            setLocalText();
            clearSpan();
            return;
        }

        const textSplited = textRef.current.textContent
            .replace(/([.!?])\s*(?=[A-ZА-ЯІ])/g, '$1|')
            .split('|');

        const result = textSplited
            .map((el) => checkRef(el, fragment, refChecked))
            .join(' ');

        textRef.current.innerHTML = result;

        localStorage.setItem('text', result);
        setLocalStorage(fragment, refChecked);
    };

    const clearSpan = () => {
        if (inputFocus) return;
        const text = textRef.current.textContent;
        textRef.current.innerHTML = text;
    };

    const setLocalStorage = (fragment, refs) => {
        const data = {
            fragment: fragment,
            refs: refs,
        };
        localStorage.setItem('data', JSON.stringify(data));
    };

    const setLocalText = () => {
        localStorage.setItem('text', textRef.current.textContent);
    };

    const reset = () => {
        setLocalStorage('', [false, false, false]);
        textRef.current.textContent = '';
        setLocalText();
        setReset((x) => x + 1);
    };

    return (
        <main>
            <div onMouseEnter={clearSpan} onMouseLeave={search}>
                <b>Введіть текст:</b>
                <InputText ref={textRef} {...setLocalText} focus={setFocus} />
            </div>
            <div className="serch">
                <b>Налаштування пошуку</b>
                <SettingsSearch
                    func={[search, reset]}
                    {...{ regRef, strictRef }}
                />
                <FragmentTxt ref={fragmentRef} func={[search, clearSpan]} />
            </div>
        </main>
    );
}
