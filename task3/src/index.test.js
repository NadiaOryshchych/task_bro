import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Table from './components/Table';
// import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

describe('Testing <App />', () => {
  const randomWidth = Math.floor(Math.random() * (50 - 1)) + 50;
  const randomHeight = Math.floor(Math.random() * (40 - 1)) + 40;
  const app = mount(<App initialWidth={randomWidth} initialHeight={randomHeight} />);

  describe('common', () => {
    it('render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render( <App /> , div);
    }); 
    // або можна написати ось так
    // it('renders without crashing', () => {
    //   shallow(<App />);
    // });
    
    it('app has table', () => {
      const app = shallow(<App />);
      // console.log(app.debug());
      expect(app.find(Table)).toHaveLength(1);
    });
  });

  describe('initial Table render', () => {
    it('set props', () => {
      const app = mount(<App initialWidth={4} initialHeight={5} />);
      expect(app.find('.row').length).toBe(5);
      expect(app.find('.cell').length).toBe(4 * 5);
    });

    it('random props', () => {
      expect(app.find('.row').length).toBe(randomHeight);
      expect(app.find('.row:first-child > .cell').length).toBe(randomWidth);
    });

    it('default props', () => {
      const app = mount(<App />);
      expect(app.find('.row').length).toBe(4);
      expect(app.find('.row:first-child > .cell').length).toBe(4);
    });
  });

  describe('functions appendColumns / appendRows', () => {
    it('adding columns', () => {
      app.find('.plus-col').simulate('click');
      expect(app.find('.row:first-child > .cell').length).toBe(randomWidth + 1);
    });

    it('adding rows', () => {
      app.find('.plus-row').simulate('click');
      expect(app.find('.row').length).toBe(randomHeight + 1);
    });
  });

  describe('function removeColumns', () => {
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

    it('selected column removal', () => {
      const app = mount(<App />);
      // app.find('.minus-col').simulate('click', { target: { dataset.index: 4 }});
      expect(app.find('.cell').get(0).props['data-idcol']).toEqual(1);
      app.find('.minus-col').simulate('click');
      expect(app.find('.cell').get(0).props['data-idcol']).toEqual(2);
    });
  });

  describe('function removeRows', () => {
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

    it('selected row removal', () => {
      const app = mount(<App />);
      app.find('.row:first-child').addClass('test');
      console.log(app.find('.row:first-child'));
      app.find('.minus-row').simulate('click');
      expect(app.find('.row:first-child').hasClass('test')).toEqual(false);
    });
  });

});



