export default function checkRef(org, frag, ref) {
    const copyStr = ref[0] ? org.toLowerCase() : org;
    const copyFrag = ref[0] ? frag.toLowerCase() : frag;
    let result;

    if (ref[1]) {
        const changeStr = copyStr
            .replace(/([ ])/g, '|')
            .replace(/([!?])/g, '|$1')
            .replace(/([.]{1,})/g, '|$1')
            .split('|');
        result = includ(changeStr, copyFrag);
    } else {
        result = includ(copyStr, copyFrag);
    }

    if (!result) return org;
    return `<span>${ref[2] ? selection(org, frag, ref[0]) : org}</span>`;
}

const includ = (copy, copyfrag) => {
    return copy.includes(copyfrag);
};

const selection = (str, frag, toCase) => {
    const regex = new RegExp('(' + [frag] + ')', 'g' + [toCase ? 'i' : '']);

    const result = str.replace(regex, '<span id="fragment">$1</span>');

    return result;
};
/*

? `<span>${org}</span>` : org;

*/
