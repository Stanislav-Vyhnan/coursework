import React, { useRef, useEffect } from 'react';
import './index.css';
import Result from '../Result';

export default function WriteTxt() {
    const textRef = useRef(null);
    const fragmentRef = useRef(null);
    const regRef = useRef(null);
    const strictRef = useRef(null);
    const selFragmRef = useRef(null);
    // regRef.current.checked,
    // strictRef.current.checked,
    // selFragmRef.current.checked;
    useEffect(() => textRef.current.focus());

    const search = () => {
        const textSplited = textRef.current.textContent
            .replace(/([.?!])\s*(?=[A-ZА-Я])/g, '$1|')
            .split('|');
        const fragment = fragmentRef.current.value;
        const result = textSplited.map((el) =>
            el.includes(fragment) ? `<span>${el}</span>` : el
        );
        textRef.current.innerHTML = result.join(' ');
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
                <div className="settings">
                    <div className="pin">
                        <label className="switch">
                            <input type="checkbox" ref={regRef} />
                            <span className="slider round"></span>
                        </label>
                        <span>Ігнорування реєстру</span>
                    </div>
                    <div className="pin">
                        <label className="switch">
                            <input type="checkbox" ref={strictRef} />
                            <span className="slider round"></span>
                        </label>
                        <span>Строгий пошук</span>
                    </div>
                    <div className="pin">
                        <label className="switch">
                            <input type="checkbox" ref={selFragmRef} />
                            <span className="slider round"></span>
                        </label>
                        <span>Виділення фрагменту</span>
                    </div>
                </div>
                <input placeholder="Введіть фрагмент" ref={fragmentRef} />
                <button onClick={search}>Search</button>
            </div>

            <Result />
        </main>
    );
}
