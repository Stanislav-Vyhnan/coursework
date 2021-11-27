import React from 'react';
import './index.scss';
const InputText = React.forwardRef(({ func, focus }, ref) => {
    const [setLocal, search] = func;
    const focusOn = () => {
        focus(true);
    };
    const focusOff = () => {
        focus(false);
        search();
    };
    return (
        <div
            className="writeTxt"
            ref={ref}
            contentEditable="true"
            onInput={setLocal}
            onClick={focusOn}
            onBlur={focusOff}
            spellCheck="false"
        />
    );
});

export default InputText;
