import Component from './Component';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

export default class App extends Component {
  render() {
    const { agents, openedAddResourceModalIndex } = this.props;
    return `<div class="app">
              ${Header.init({}, null, this)}
              ${Content.init({ agents, openedAddResourceModalIndex }, null, this)}
              ${Footer.init({}, null, this)}
           </div>`;
  }
}
