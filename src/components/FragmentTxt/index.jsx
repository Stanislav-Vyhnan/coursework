import React from 'react';

const FragmentTxt = React.forwardRef(({ func }, ref) => {
    const [search, reset] = func;
    return (
        <input
            placeholder="Введіть фрагмент"
            ref={ref}
            onInput={search}
            onClick={search}
            onBlur={reset}
        />
    );
});

export default FragmentTxt;
