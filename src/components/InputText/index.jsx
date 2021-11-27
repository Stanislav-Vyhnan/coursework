import React from 'react';
import './index.scss';
const InputText = React.forwardRef(({ func, focus }, ref) => {
    const [focusOn, focusOff] = focus;
    return (
        <div
            id="inputTxt"
            className="writeTxt"
            ref={ref}
            contentEditable="true"
            onInput={func}
            onClick={focusOn}
            onBlur={focusOff}
            spellCheck="false"
        />
    );
});

export default InputText;
