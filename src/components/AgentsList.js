import Component from './Component';
import Agent from './Agent';

export default class AgentsList extends Component {

  openModal = index => {
    this.props.openedAddResourceModalIndex = index;
    this.refresh();
  };

  closeModal = () => {
    this.props.openedAddResourceModalIndex = -1;
    this.refresh();
  };

  render() {
    const {  openModal,closeModal } = this;
    const { agents, openedAddResourceModalIndex } = this.props;
    return `<ul class="agent-list">
              ${Component.map(agents, (agent, index) => Agent.init({
                agent,
                index,
                openedAddResourceModalIndex,
                openModal,
                closeModal
              }, null, this))}
            </ul>`;
  }
}
