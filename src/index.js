import Component from './components/Component';
import App from './components/App';
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
}, {
  domain: 'a01.thoughtworks.com',
  ip: '192.168.1.101',
  path: '/var/lib/cruise',
  resources: ['Chrome', 'FireFox', 'Safari']
}, {
  domain: 'a01.thoughtworks.com',
  ip: '192.168.1.101',
  path: '/var/lib/cruise',
  resources: ['Chrome', 'FireFox', 'Safari']
}];

window.agents = agents;

Component.renderToDOM(App.init({ agents }), document.querySelector('#root'));
