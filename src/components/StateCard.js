import Component from './Component';

export default class ToolBar extends Component {
  render() {
    const { children } = this.props;
    return `<div class="state-card">
                ${children}
           </div>`;
  }
}
