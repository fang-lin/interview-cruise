import Component from './Component';
import { escapeHTML, trim } from './utility';

export default class ResourceModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { toggleModal, addResources } = this.props;
    this.__DOM.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      addResources(
        event.target[0].value.split(',')
          .map(resource => escapeHTML(trim(resource)))
          .filter(resource => resource.length)
      );
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
