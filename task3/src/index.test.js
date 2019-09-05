import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Table from './components/Table';
import {shallow, mount} from 'enzyme';

describe('Testing <App />', () => {
  const randomWidth = Math.floor(Math.random() * (50 - 1)) + 50;
  const randomHeight = Math.floor(Math.random() * (40 - 1)) + 40;
  const app = mount(<App initialWidth={randomWidth} initialHeight={randomHeight} />);
    
  describe('render App', () => {    
    console.log(randomWidth, randomHeight, app);
    it('render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render( <App /> , div);
    });
    
    it('render app with table', () => {
      const app = shallow(<App />);
      expect(app.find(Table)).toHaveLength(1);
    });

    it('render with random props', () => {
      expect(app.find('.row').length).toBe(randomHeight);
      expect(app.find('.row:first-child > .cell').length).toBe(randomWidth);
    });

    it('render with default props', () => {
      const app = mount(<App />);
      expect(app.find('.row').length).toBe(4);
      expect(app.find('.row:first-child > .cell').length).toBe(4);
    });
  });

  describe('testing unctions appendColumns / appendRows', () => {
    it('adding columns', () => {
      app.find('.plus-col').simulate('click');
      expect(app.find('.row:first-child > .cell').length).toBe(randomWidth + 1);
    });

    it('adding rows', () => {
      app.find('.plus-row').simulate('click');
      expect(app.find('.row').length).toBe(randomHeight + 1);
    });
  });

  describe('testing function removeColumns', () => {
    it('one column removal', () => {
      const app = mount(<App initialWidth={randomWidth} />);
      app.find('.minus-col').simulate('click');
      expect(app.find('.row:first-child > .cell').length).toBe(randomWidth - 1);
    });

    it('block the last column removal', () => {
      const app = mount(<App initialWidth={1} />);
      app.find('.minus-col').simulate('click');
      expect(app.find('.row:first-child > .cell').length).toBe(1);
    });
  });

  describe('testing function removeRows', () => {
    it('one row removal', () => {
      const app = mount(<App initialHeight={randomHeight} />);
      app.find('.minus-row').simulate('click');
      expect(app.find('.row').length).toBe(randomHeight - 1);
    });

    it('block the last row removal', () => {
      const app = mount(<App initialHeight={1} />);
      app.find('.minus-row').simulate('click');
      expect(app.find('.row').length).toBe(1);
    });
  });
});
