import React from 'react';
import './index.scss';
const InputText = React.forwardRef(({ func }, ref) => (
    <div
        id="inputTxt"
        className="writeTxt"
        ref={ref}
        contentEditable="true"
        onInput={func}
    />
));

export default InputText;
