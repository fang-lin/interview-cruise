import Component from './Component';

export default class ResourceModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { toggleModal, addResources } = this.props;
    this.__DOM.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      console.dir();
      addResources(event.target[0].value.split(','));
    });
    this.__DOM.querySelector('input[type="button"]').addEventListener('click', event => {
      toggleModal(false);
    });
  }

  render() {

    return `<div>
              <form>
                <input type="text">
                <input type="button" value="Cancel">
                <input type="submit" value="Submit">
              </form>
            </div>`
  }
}

