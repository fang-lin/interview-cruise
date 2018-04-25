export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.componentKey = '0';
    this.children = [];
    this.__events = [];
  }

  createHTML() {
    this.__events = [];
    const html = this.render().replace(Component.eventHandlerRegExp, (match, type, key) => {
      this.__events[key].type = type;
      return `${Component.eventKeyName}-${this.componentKey}-${key}`;
    });

    const dom = (new DOMParser()).parseFromString(html, 'text/html').body.firstChild;
    dom.setAttribute(Component.componentKeyName, this.componentKey);
    return dom.outerHTML;
  }

  on(handler) {
    const key = this.__events.length;
    this.__events.push({ handler });
    return `"__event_handler__[${key}]"`;
  }

  componentDidMount() {
  }

  __componentDidMount() {
    this.__DOM = document.querySelector(`[${Component.componentKeyName}="${this.componentKey}"]`);

    this.__events.forEach((event, key) => {
      const { type, handler } = event;
      const target = document.querySelector(`[${Component.eventKeyName}-${this.componentKey}-${key}]`);
      target.addEventListener(type, handler);
    });

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
      newComponent.componentKey = `${parent.componentKey}_${parent.children.length}`;
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
Component.eventKeyName = 'event-key';
Component.eventTypes = 'submit|change|click';
Component.eventHandlerRegExp = new RegExp(`(${Component.eventTypes})="__event_handler__\\[(\\d+)\\]"`, 'g');
