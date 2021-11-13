import React, { useRef, useEffect } from 'react';
import './index.css';
import Result from '../Result';
export default function WriteTxt() {
    const textRef = useRef(null);
    const fragmentRef = useRef(null);

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
                    title="Введіть текст"
                    contentEditable="true"
                />
            </div>
            <div className="serch">
                <input placeholder="Введіть фрагмент" ref={fragmentRef} />
                <button onClick={search}>Search</button>
            </div>

            <Result />
        </main>
    );
}
