import Component from './Component';
import Resource from './Resource';
import ResourceModal from './ResourceModal';

export default class ResourcesList extends Component {
  constructor(props) {
    super(props);
    this.isOpenModal = false;
  }

  componentDidMount() {
    this.__DOM.querySelector('span').addEventListener('click', event => {
      this.toggleModal(true);
    });
  }

  removeResource = (name) => {
    const { resources } = this.props;
    const index = resources.indexOf(name);
    resources.splice(index, 1);
    this.refresh();
  };

  addResources = (newResources) => {
    const { resources } = this.props;
    resources.splice(resources.length, 0, ...newResources);
    this.isOpenModal = false;
    this.refresh();
  };

  toggleModal = (state) => {
    this.isOpenModal = state;
    this.refresh();
  };

  render() {
    const { resources } = this.props;
    const { removeResource, toggleModal, addResources } = this;

    return `<div>
              <span>Add Resource</span>
              <ul>
                ${Component.map(resources, resource => Resource.init({ removeResource }, resource, this))}
              </ul>
              ${this.isOpenModal ? ResourceModal.init({ toggleModal, addResources }, null, this) : '' }
            </div>`
  }
}

