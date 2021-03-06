import React from 'react';
import './index.scss';
const InputText = React.forwardRef(({ funcs }, ref) => {
    const [setLocalText, focus] = funcs;
    const focusOn = () => {
        focus(true);
    };
    const focusOff = () => {
        focus(false);
    };
    return (
        <div
            className="writeTxt"
            ref={ref}
            contentEditable="true"
            onInput={setLocalText}
            onClick={focusOn}
            onBlur={focusOff}
            spellCheck="false"
        />
    );
});

export default InputText;
