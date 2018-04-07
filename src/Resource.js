import Component from './Component';

export default class Resource extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { removeResource, children } = this.props;
    this.__DOM.addEventListener('click', event => {
      removeResource(children);
    });
  }

  render() {
    const { children } = this.props;
    return `<div>
              <span>${children}</span>
              <span>X</span>
            </div>`
  }
}

