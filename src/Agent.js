import Component from './Component';
import ResourcesList from './ResourcesList';
import ResourceModal from "./ResourceModal";

export default class Agent extends Component {
  constructor(props) {
    super(props);
  }

  addResources = (newResources) => {
    const { resources } = this.props.agent;
    newResources.forEach(resource => {
      if (resources.indexOf(resource) === -1) {
        resources.push(resource);
      }
    });
    this.isOpenModal = false;
    this.refresh();
  };

  toggleModal = (state) => {
    this.isOpenModal = state;
    this.refresh();
  };

  render() {
    const { toggleModal, addResources } = this;
    const { agent } = this.props;
    const { resources } = agent;

    return `<li class="agent">
               <div class="agent-detail">
                 <span>${agent.domain}</span>
                 <span>${agent.ip}</span>
                 <span>${agent.path}</span>
               </div>
               <div>
                ${ResourcesList.init({ resources }, null, this)}
                <a click=${this.on(() => this.toggleModal(true))}>+ Add Resource</a>
                ${this.isOpenModal ? ResourceModal.init({ toggleModal, addResources }, null, this) : '' }
              </div>
           </li>`;
  }
}
