import React, { useRef, useEffect } from 'react';
import './index.scss';
import checkRef from './checkRef';
import SettingsSearch from '../SettingsSearch';
import InputText from '../InputText';

export default function WriteTxt() {
    const textRef = useRef(null);
    const fragmentRef = useRef(null);

    const regRef = useRef(false);
    const strictRef = useRef(false);
    const selFragmRef = useRef(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        const text = localStorage.getItem('text');
        if (data) {
            regRef.current.checked = data.refs[0];
            strictRef.current.checked = data.refs[1];
            selFragmRef.current.checked = data.refs[2];

            fragmentRef.current.value = data.fragment;
        }
        if (text) {
            textRef.current.innerHTML = text;
        }
    }, []);

    const search = () => {
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

    return (
        <main>
            <div>
                <b>Введіть текст:</b>
                <InputText ref={textRef} func={setLocalText} />
            </div>
            <div className="serch" onMouseLeave={reset} onMouseEnter={search}>
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
