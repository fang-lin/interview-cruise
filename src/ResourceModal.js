import Component from './Component';
import { escapeHTML, trim } from './utility';

export default class ResourceModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { toggleModal, addResources } = this.props;
    this.on('submit', 'form', event => {
      event.preventDefault();
      addResources(
        event.target[0].value.split(',')
          .map(resource => escapeHTML(trim(resource)))
          .filter(resource => resource.length)
      );
    });
    this.on('click', 'input[type="button"]', event => {
      toggleModal(false);
    });
  }

  asdasda() {

  }

  render() {
    return `<div class="resource-modal">
              <form click="this.asdasda">
                <input class="resource-modal-input" type="text">
                <input class="resource-modal-button" type="button" value="Cancel">
                <input class="resource-modal-button" type="submit" value="Submit">
              </form>
            </div>`
  }
}
