import Component from './Component';

export default class Resource extends Component {

  render() {
    const { removeResource, children } = this.props;
    return `<div class="resource-item">
              <span>${children}</span>
              <a click=${this.on(() => removeResource(children))}>[X]</a>
            </div>`
  }
}

