import { strip, mergeDOM } from '../utility';

export default class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.componentKey = '0';
    this.children = [];
    this.__events = [];
    this.__deposedEvents = [];
  }

  createNode() {
    this.__deposedEvents = this.__events;
    this.__events = [];
    const html = this.render().replace(Component.eventHandlerRegExp, (match, type, key) => {
      console.log('key', key);
      this.__events[key].type = type;
      return `${Component.eventKeyName}_${this.componentKey}_${key}`;
    });
    const dom = (new DOMParser()).parseFromString(html, 'text/html').body.firstChild;
    strip(dom);
    dom.setAttribute(Component.componentKeyName, this.componentKey);
    return dom;
  }

  on(handler) {
    const key = this.__events.length;
    this.__events.push({ handler });
    return `"__event_handler__${this.componentKey}_${key}"`;
  }

  setState(newState) {
    this.state = Object.assign(this.state, newState);
    this.refresh();
  }

  componentDidMount() {
  }

  __refresh() {
    this.__DOM = document.querySelector(`[${Component.componentKeyName}="${this.componentKey}"]`);

    if (this.__DOM.__component) {
      Component.removeEvents(this.__DOM.__component, this.__DOM.__component.__events);
    }
    Component.removeEvents(this, this.__deposedEvents);
    this.__deposedEvents = [];
    this.__DOM.__component = this;

    this.__events.forEach((event, key) => {
      const { type, handler } = event;
      const target = this.__DOM.querySelector(`[${Component.eventKeyName}_${this.componentKey}_${key}]`);
      target.addEventListener(type, handler);
    });
    this.componentDidMount();
    this.children.map(child => child.__refresh());
  }

  render() {
    return '';
  }

  refresh() {
    this.children = [];
    mergeDOM(this.__DOM, this.createNode());
    this.__refresh();
  }

  static renderToDOM(html, dom) {
    dom.innerHTML = html;
    Component.__rootComponent.__refresh();
  }

  static init(props = {}, children, parent) {
    const newProps = Object.assign(props, { children });
    const newComponent = new this(newProps);
    if (parent) {
      newComponent.componentKey = `${parent.componentKey}-${parent.children.length}`;
      parent.children.push(newComponent);
    } else {
      Component.__rootComponent = newComponent;
    }
    return newComponent.createNode().outerHTML;
  }

  static map(list, callback) {
    return list.map(item => callback(item)).join('');
  }

  static removeEvents(component, events) {
    events.forEach((event, key) => {
      const { type, handler } = event;
      const target = component.__DOM.querySelector(`[${Component.eventKeyName}_${component.componentKey}_${key}]`);
      target.removeEventListener(type, handler);
    });
  }
}

Component.componentKeyCount = 0;
Component.componentKeyName = 'component-key';
Component.eventKeyName = 'event-key';
Component.eventTypes = 'submit|change|click';
Component.eventHandlerRegExp = new RegExp(`(${Component.eventTypes})="__event_handler__[-\\d]+_(\\d+)"`, 'g');
