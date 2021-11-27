export default function checkRef(org, frag, ref) {
    const corectFrag = frag.replace(/([[\]\\^$.|?*+()])/g, '\\$1');
    const regExp = new RegExp(
        '(' + corectFrag + ')',
        'g' + [ref[0] ? 'i' : '']
    );

    let result;
    if (ref[1]) {
        result = org
            .replace(/([  ])/g, '|$1|')
            .replace(/(([—!?,:"»@$%^&*#)\]])|(\.){1,})/g, '|$1')
            .replace(/([({[«])/g, '$1|')
            .split('|')
            .map((el) => {
                return el.length === frag.length ? selection(el, regExp) : el;
            })
            .join('');
    } else {
        result = selection(org, regExp);
    }
    return org.length === result.length
        ? `<span class="hide">${org}</span>`
        : `<span>${result}</span>`;
}

const selection = (str, regex) => {
    const result = str.replace(regex, '<span class="fragment">$1</span>');
    return result;
};
