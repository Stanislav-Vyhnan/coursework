export default function checkRef(str, frag, ref) {
    const copyStr = ref[0] ? str.toLowerCase() : str;
    const copyFrag = ref[0] ? frag.toLowerCase() : frag;
    if (ref[1]) {
        const changeStr = copyStr
            .replace(/([ ])/g, '|')
            .replace(/([!.])/g, '|$1')
            .split('|');
        return includ(changeStr, copyFrag, str);
    } else {
        return includ(copyStr, copyFrag, str);
    }
}

const includ = (el, frag, original) => {
    return el.includes(frag)
        ? `<span id="coincidence">${original}</span>`
        : original;
};
