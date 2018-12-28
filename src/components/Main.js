import Component from './Component';
import StateCard from './StateCard';
import ToolBar from './ToolBar';
import AgentsList from './AgentsList';


export default class Main extends Component {
  render() {
    const { agents, openedAddResourceModalIndex } = this.props;
    return `<div class="main">
                <div class="state-cards">
                    ${StateCard.init({}, 'Building', this)}
                    ${StateCard.init({}, 'Idle', this)}
                    ${StateCard.init({}, 'All', this)}
                </div>
                ${ToolBar.init({}, null, this)}
                <div class="agent-list-wrapper">
                    ${AgentsList.init({ agents, openedAddResourceModalIndex }, null, this)}
                </div>
           </div>`;
  }
}
