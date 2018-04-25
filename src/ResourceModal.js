import Component from './Component';

export default class ResourceModal extends Component {
  constructor(props) {
    super(props);
  }

  static escapeResource(text) {
    const node = document.createElement('span');
    node.innerText = text;
    return node.innerHTML;
  }

  componentDidMount() {
    const { toggleModal, addResources } = this.props;
    this.__DOM.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      addResources(event.target[0].value.split(',').map(resource => ResourceModal.escapeResource(resource)));
    });
    this.__DOM.querySelector('input[type="button"]').addEventListener('click', event => {
      toggleModal(false);
    });
  }

  render() {
    return `<div class="resource-modal">
              <form>
                <input class="resource-modal-input" type="text">
                <input class="resource-modal-button" type="button" value="Cancel">
                <input class="resource-modal-button" type="submit" value="Submit">
              </form>
            </div>`
  }
}



