export default function checkRef(org, frag, ref) {
    const corectFrag = frag.replace(/([[\]\\^$.|?*+()])/g, '\\$1');
    const regex = new RegExp('(' + corectFrag + ')', 'g' + [ref[0] ? 'i' : '']);
    let result;
    if (ref[1]) {
        const orgArr = org
            .replace(/( )/g, '|$1|')
            .replace(/(([—!?,:"@$%^&*#)\]])|(\.){1,})/g, '|$1')
            .replace(/([({[])/g, '$1|')
            .split('|');
        result = orgArr
            .map((el) => {
                return el.length === frag.length ? selection(el, regex) : el;
            })
            .join('');
    } else {
        result = selection(org, regex);
    }
    return org.length === result.length ? org : `<span>${result}</span>`;
}

const selection = (str, regExp) => {
    const result = str.replace(regExp, '<span id="fragment">$1</span>');
    return result;
};

/*

const result = ref[1]
        ? copyStr
              .replace(/([ ])/g, '|$1|')
              .replace(/(([!?,"@$%^&*#)\]])|(\.){1,})/g, '|$1')
              .replace(/([({[])/g, '$1|')
              .split('|')
              .includes(copyFrag)
        : copyStr.includes(copyFrag);
        if (!result) return org;*/
