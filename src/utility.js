export const escapeHTML = text => {
  const node = document.createElement('span');
  node.innerText = text;
  return node.innerHTML;
};

export const trim = text => text.replace(/^\s+|\s+$/g, '');
