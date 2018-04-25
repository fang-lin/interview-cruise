import Component from './Component';

export default class Resource extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { removeResource, children } = this.props;
    this.on('click', '.remove', event => {
      removeResource(children);
    });
  }

  render() {
    const { children } = this.props;
    return `<div class="resource-item">
              <span>${children}</span>
              <a class="remove">[X]</a>
            </div>`
  }
}

