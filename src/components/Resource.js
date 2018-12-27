import Component from './Component';

export default class Resource extends Component {

  render() {
    const { removeResource, children } = this.props;
    return `<li class="resource-item">
              <span>${children}</span>
              <a click=${this.on(() => removeResource(children))}>[X]</a>
            </>`
  }
}

