import Component from './Component';
import { escapeHTML, trim } from '../utility';

export default class ResourceModal extends Component {

  onSubmitForm = event => {
    event.preventDefault();
    this.props.addResources(
      event.target[0].value.split(',')
        .map(resource => escapeHTML(trim(resource)))
        .filter(resource => resource.length)
    );
  };

  render() {
    const { toggleModal } = this.props;
    return `<div class="resource-modal">
              <form submit=${this.on(this.onSubmitForm)}>
                <input class="resource-modal-input" type="text">
                <input class="resource-modal-button" type="button" value="Cancel" click=${this.on(() => toggleModal(false))}>
                <input class="resource-modal-button" type="submit" value="Submit">
              </form>
            </div>`;
  }
}
