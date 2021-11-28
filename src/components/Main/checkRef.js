export default function checkRef(org, frag, ref) {
    const [toCase, strictMode] = ref;
    const corectFrag = frag.replace(/([[\]\\^$.|?*+()])/g, '\\$1');
    const regExp = new RegExp(
        '(' + corectFrag + ')',
        'g' + [toCase ? 'i' : '']
    );

    const result = strictMode
        ? org
              .replace(/([  ])/g, '|$1|')
              .replace(/(([—!?,:"»@$%^&*#)\]])|(\.){1,})/g, '|$1')
              .replace(/([({[«])/g, '$1|')
              .split('|')
              .map((el) => {
                  return el.length === frag.length ? selection(el, regExp) : el;
              })
              .join('')
        : selection(org, regExp);

    return org.length === result.length
        ? `<span class="hide">${org}</span>`
        : `<span class="sentence">${result}</span>`;
}

const selection = (str, regex) => {
    const result = str.replace(regex, '<span class="fragment">$1</span>');
    return result;
};
