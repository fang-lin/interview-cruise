import Component from './Component';
import Resource from './Resource';

export default class ResourcesList extends Component {
  constructor(props) {
    super(props);
    this.isOpenModal = false;
  }

  removeResource = (name) => {
    const { resources } = this.props;
    const index = resources.indexOf(name);
    resources.splice(index, 1);
    this.refresh();
  };

  render() {
    const { resources } = this.props;
    const { removeResource, toggleModal, addResources } = this;

    return `<ul class="resources-list">
              ${Component.map(resources, resource => Resource.init({ removeResource }, resource, this))}
            </ul>`
  }
}

