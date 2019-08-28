import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Table from './components/Table';
// import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

describe('Testing <App />', () => {

  // beforeEach(() => {
  //   app.instance().render();
  // });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <App /> , div);
  }); 
  // або можна написати ось так
  // it('renders without crashing', () => {
  //   shallow(<App />);
  // });
  
  it('testing app has table', () => {
    const app = shallow(<App />);
    // console.log(app.debug());
    expect(app.find(Table)).toHaveLength(1);
  });

  // mount i shallow - яка різниця між ними
  it('render initial Table width my props', () => {
    const app = mount(<App initialWidth={4} initialHeight={5} />);
    expect(app.find('.row').length).toBe(5);
    expect(app.find('.row > .cell').length).toBe(4*5);
  });

  it('render initial Table width random props', () => {
    const randomWidth = Math.floor(Math.random() * (50 - 1)) + 50;
    const randomHeight = Math.floor(Math.random() * (40 - 1)) + 40;
    const app = mount(<App initialWidth={randomWidth} initialHeight={randomHeight} />);
    expect(app.find('.row').length).toBe(randomHeight);
    expect(app.find('.row:first-child > .cell').length).toBe(randomWidth);
  });

  it('render initial Table width default props', () => {
    const app = mount(<App />);
    expect(app.find('.row').length).toBe(4);
    expect(app.find('.row:first-child > .cell').length).toBe(4);
  });

  it('testing function appendColumns', () => {
    const randomWidth = Math.floor(Math.random() * (50 - 1)) + 50;
    const app = mount(<App initialWidth={randomWidth} />);
    app.find('.plus-col').simulate('click');
    expect(app.find('.row:first-child > .cell').length).toBe(randomWidth + 1);
  });

  it('testing function appendRows', () => {
    const randomHeight = Math.floor(Math.random() * (40 - 1)) + 40;
    const app = mount(<App initialHeight={randomHeight} />);
    app.find('.plus-row').simulate('click');
    expect(app.find('.row').length).toBe(randomHeight + 1);
  });

  it('testing function removeColumns', () => {
    const randomWidth = Math.floor(Math.random() * (50 - 1)) + 50;
    const app = mount(<App initialWidth={randomWidth} />);
    app.find('.minus-col').simulate('click');
    expect(app.find('.row:first-child > .cell').length).toBe(randomWidth - 1);
  });

  it('testing function removeRows', () => {
    const randomHeight = Math.floor(Math.random() * (40 - 1)) + 40;
    const app = mount(<App initialHeight={randomHeight} />);
    app.find('.minus-row').simulate('click');
    expect(app.find('.row').length).toBe(randomHeight - 1);
  });

  it('testing function removeColumns on last column', () => {
    const app = mount(<App initialWidth={1} />);
    app.find('.minus-col').simulate('click');
    expect(app.find('.row:first-child > .cell').length).toBe(1);
  });

  it('testing function removeRows on last row', () => {
    const app = mount(<App initialHeight={1} />);
    app.find('.minus-row').simulate('click');
    expect(app.find('.row').length).toBe(1);
  });



});



