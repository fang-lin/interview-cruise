import Component from './src/Component';
import AgentsList from './src/AgentsList';
import './styles.css';

const agents = [{
  domain: 'a01.thoughtworks.com',
  ip: '192.168.1.101',
  path: '/var/lib/cruise',
  resources: ['Chrome', 'FireFox'],
}, {
  domain: 'a01.thoughtworks.com',
  ip: '192.168.1.101',
  path: '/var/lib/cruise',
  resources: ['Chrome', 'FireFox', 'Safari']
}];

window.agents = agents;

Component.renderToDOM(AgentsList.init({ agents }), document.querySelector('#root'));




