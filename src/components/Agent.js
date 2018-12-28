import Component from './Component';
import ResourcesList from './ResourcesList';
import ResourceModal from "./ResourceModal";
import './Agent.css';

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
    this.props.openedAddResourceModalIndex = -1;
    this.refresh();
  };

  render() {
    const { addResources } = this;
    const {
      agent, index,
      openedAddResourceModalIndex,
      openModal,
      closeModal
    } = this.props;
    const { resources } = agent;

    return `<li class="agent">
               <div class="agent-detail">
                 <span>${agent.domain}</span>
                 <span>${agent.ip}</span>
                 <span>${agent.path}</span>
               </div>
               <div>
                  ${ResourcesList.init({ resources }, null, this)}
                  <div class="add-resource-wrapper">
                    <a click=${this.on(() => openModal(index))}>+ Add Resource</a>
                    ${(index === openedAddResourceModalIndex) ? ResourceModal.init({
                      closeModal,
                      addResources
                    }, null, this) : '' }
                  </div>
              </div>
           </li>`;
  }
}
