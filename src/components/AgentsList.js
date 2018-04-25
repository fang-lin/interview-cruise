import Component from './Component';
import Agent from './Agent';

export default class AgentsList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { agents } = this.props;
    return `<ul class="agent-list">${Component.map(agents, agent => Agent.init({ agent }, null, this))}</ul>`;
  }
}
