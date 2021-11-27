import React from 'react';
import './index.scss';

const FragmentTxt = React.forwardRef(({ func }, ref) => {
    const [search, reset] = func;

    return (
        <input
            placeholder="Введіть фрагмент"
            ref={ref}
            onInput={search}
            onClick={search}
            onBlur={reset}
            spellCheck="false"
        />
    );
});

export default FragmentTxt;
