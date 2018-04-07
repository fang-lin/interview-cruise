import Component from './Component';
import ResourcesList from './ResourcesList';

export default class Agent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { agent } = this.props;
    const { resources } = agent;
    return `<li>
               <h3>${agent.domain}</h3>
               <h3>${agent.ip}</h3>
               <h3>${agent.path}</h3>
               ${ResourcesList.init({ resources }, null, this)}
           </li>`;
  }
}
