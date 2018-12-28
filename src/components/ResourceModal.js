import Component from './Component';
import { escapeHTML, trim } from '../utility';
import './ResourceModal.css';

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
    const { closeModal } = this.props;
    return `<div>
              <div class="resource-modal-background" click=${this.on(closeModal)}></div>
              <div class="resource-modal">
                <form submit=${this.on(this.onSubmitForm)}>
                  <input class="resource-modal-input" type="text">
                  <input class="resource-modal-button" type="button" value="Cancel" click=${this.on(closeModal)}>
                  <input class="resource-modal-button" type="submit" value="Submit">
                </form>
              </div>
           </div>`;
  }
}
