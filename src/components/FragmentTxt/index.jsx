import React from 'react';
import './index.scss';

const FragmentTxt = React.forwardRef(({ funcs }, ref) => {
    const [search, clearSpan] = funcs;

    return (
        <input
            placeholder="Введіть фрагмент"
            ref={ref}
            onInput={search}
            onClick={search}
            onBlur={clearSpan}
            spellCheck="false"
        />
    );
});

export default FragmentTxt;
