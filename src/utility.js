export const escapeHTML = text => {
  const node = document.createElement('span');
  node.innerText = text;
  return node.innerHTML;
};

export const trim = text => text.replace(/^\s+|\s+$/g, '');

export const strip = (node) => {
  for (let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
      node.removeChild(child);
      i--;
    } else if (child.nodeType === 1) {
      strip(child);
    }
  }
};


export function mergeDOM(prevNode, nextNode) {
  if (prevNode.outerHTML !== nextNode.outerHTML) {
    if (prevNode.children.length === 0 && nextNode.children.length === 0) {
      prevNode.parentNode.replaceChild(nextNode.cloneNode(true), prevNode);
    } else if (nextNode.children.length === 0) {
      prevNode.innerHTML = '';
    } else {
      const prevNodeClone = prevNode.cloneNode(true);
      const nextNodeClone = nextNode.cloneNode(true);
      prevNodeClone.innerHTML = '';
      nextNodeClone.innerHTML = '';

      if (prevNodeClone.outerHTML === nextNodeClone.outerHTML) {
        const prevChildrenCount = prevNode.children.length;
        const nextChildrenCount = nextNode.children.length;

        for (let i = 0, length = Math.max(prevChildrenCount, nextChildrenCount); i < length; i++) {
          const prevChild = prevNode.children[i];
          const nextChild = nextNode.children[i];
          if (!prevChild) {
            prevNode.append(nextChild.cloneNode(true));
          } else if (!nextChild) {
            prevChild.remove();
          } else {
            mergeDOM(prevChild, nextChild.cloneNode(true));
          }
        }
      } else {
        prevNode.parentNode.replaceChild(nextNode.cloneNode(true), prevNode);
      }
    }
  }
}
