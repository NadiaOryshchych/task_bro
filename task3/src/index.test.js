import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Table from './components/Table';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Testing <Table /> initial', () => {
  const table = shallow( <Table /> )

  it('render initial Table', () => {
    expect(table.find('div.table > div.row')).to.have.lengthOf(4);
    // expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
  });
});

describe('Testing <App />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <App /> , div);
  });
  // або можна написати ось так
  xit('renders without crashing', () => {
    shallow(<App />);
  });
  
  const app = shallow(<App />);
  // const table = shallow(<Table />); 

  it('renders three <Table /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Table)).to.have.lengthOf(1);
  });
  
  xit('testing App props', () => {
    app.instance().render();
    // expect(app).toMatchSnapshot();
    expect(app.find('div.table > div.row')).toHaveLength(4)
  });

  xit('App has Table', () => {
    app.instance().render();
    // expect(app.contains(table)).toBe(true);
    expect(app.state().contains(table)).toEqual(true);
  });

  // записую змінну
  // записую метод app.instance().назва методу();
  // записую значення стейт expect(app.state().назва властивості).toBeFalsy();
});



