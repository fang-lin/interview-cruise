import Component from './Component';
import ResourcesList from './ResourcesList';
import ResourceModal from "./ResourceModal";

export default class Agent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.__DOM.querySelector('.add').addEventListener('click', event => {
      this.toggleModal(true);
    });
  }

  addResources = (newResources) => {
    const { resources } = this.props.agent;
    resources.splice(resources.length, 0, ...newResources);
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
                <a class="add">+ Add Resource</a>
                ${this.isOpenModal ? ResourceModal.init({ toggleModal, addResources }, null, this) : '' }
              </div>
           </li>`;
  }
}
