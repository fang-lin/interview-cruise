export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.componentKey = '0';
    this.children = [];
  }

  createHTML() {
    const html = this.render();
    const dom = (new DOMParser()).parseFromString(html, 'text/html').body.firstChild;
    dom.setAttribute(Component.componentKeyName, this.componentKey);
    return dom.outerHTML;
  }

  on(eventType, selector, handler) {

    let dom;
    if (typeof selector === 'function') {
      handler = selector;
      dom = this.__DOM;
    } else {
      dom = this.__DOM.querySelector(selector);
    }

    dom.addEventListener(eventType, handler);
    return dom;
  }

  componentDidMount() {
  }

  __componentDidMount() {
    this.__DOM = document.querySelector(`[${Component.componentKeyName}="${this.componentKey}"]`);
    this.componentDidMount();
    this.children.map(child => child.__componentDidMount());
  }

  render() {
    return '';
  }

  refresh(html, dom) {
    this.children = [];
    this.__DOM.outerHTML = this.createHTML();
    this.__componentDidMount();
  }

  static renderToDOM(html, dom) {
    dom.innerHTML = html;
    Component.__rootComponent.__componentDidMount();
  }

  static init(props = {}, children, parent) {
    const newProps = Object.assign(props, { children });
    const newComponent = new this(newProps);
    if (parent) {
      newComponent.componentKey = `${parent.componentKey}.${parent.children.length}`;
      parent.children.push(newComponent);
    } else {
      Component.__rootComponent = newComponent;
    }
    return newComponent.createHTML();
  }

  static map(list, callback) {
    return list.map(item => callback(item)).join('');
  }
}

Component.componentKeyCount = 0;
Component.componentKeyName = 'component-key';
