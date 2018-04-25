import Component from './Component';
import SideBar from './SideBar';
import Main from './Main';

export default class Content extends Component {
  render() {
    const { agents } = this.props;
    return `<article class="content">
               ${SideBar.init({}, null, this)}
               ${Main.init({ agents }, null, this)}
           </article>`;
  }
}
