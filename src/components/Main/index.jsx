import React, { useRef, useEffect, useState } from 'react';
import './index.scss';

import checkRef from './checkRef';
import SettingsSearch from '../SettingsSearch';
import InputText from '../InputText';
import FragmentTxt from '../FragmentTxt';

export default function WriteTxt() {
    const textRef = useRef(null);
    const fragmentRef = useRef(null);

    const [clearCheck, setClear] = useState(0);
    const [inputFocus, setFocus] = useState(false);

    const regRef = useRef(false);
    const strictRef = useRef(false);
    const selFragmRef = useRef(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        const text = localStorage.getItem('text');

        if (data !== null) {
            regRef.current.checked = data.refs[0];
            strictRef.current.checked = data.refs[1];
            selFragmRef.current.checked = data.refs[2];

            fragmentRef.current.value = data.fragment;
        }
        if (text !== null) {
            textRef.current.innerHTML = text;
        }
    }, [clearCheck]);

    const focusOn = () => {
        setFocus(true);
    };
    const focusOff = () => {
        setFocus(false);
    };

    const search = () => {
        if (inputFocus) return;
        const refChecked = [
            regRef.current.checked,
            strictRef.current.checked,
            selFragmRef.current.checked,
        ];

        const fragment = fragmentRef.current.value;

        if (fragment === '') {
            setLocalStorage(fragment, refChecked);
            setLocalText();
            reset();
            return;
        }

        const textSplited = textRef.current.textContent.replace(
            /([.!?])\s*(?=[A-ZА-ЯІ])/g,
            '$1|'
        );

        const result = textSplited
            .split('|')
            .map((el) => {
                return checkRef(el, fragment, refChecked);
            })
            .join(' ');

        textRef.current.innerHTML = result;

        localStorage.setItem('text', result);
        setLocalStorage(fragment, refChecked);
    };

    const reset = () => {
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

    const clear = () => {
        setLocalStorage('', [false, false, false]);
        textRef.current.textContent = '';
        setLocalText();
        setClear((x) => x + 1);
    };

    return (
        <main>
            <button onClick={clear}>Clear All</button>
            <div>
                <b>Введіть текст:</b>
                <InputText
                    ref={textRef}
                    func={setLocalText}
                    focus={[focusOn, focusOff]}
                />
            </div>
            <div className="serch" onMouseLeave={reset} onMouseEnter={search}>
                <b>Налаштування пошуку</b>
                <SettingsSearch
                    {...{ regRef, strictRef, selFragmRef, search }}
                />
                <FragmentTxt ref={fragmentRef} func={[search, reset]} />
            </div>
        </main>
    );
}
