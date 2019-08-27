import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Table from './components/Table';
// import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

describe('Testing <App />', () => {

  // beforeEach(() => {
  //   app.instance().render();
  // });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <App /> , div);
  }); 
  // або можна написати ось так
  xit('renders without crashing', () => {
    shallow(<App />);
  });
  
  it('testing app has table', () => {
    const app = shallow(<App />);
    expect(app.find(Table)).toHaveLength(1);
  });

  // нужно задать инишиал валюас и построить апп свой - найти в нем таблицу - посчитать количество строк и колонок
  it('render initial Table', () => {
    const app = shallow(<App initialWidth={4} initialHeight={5} />);
    const table = shallow( <Table /> );
    expect(app.find(Table).length).toBe(1);
    expect(table.find('.row').length).toBe(5);
  });

  // записую змінну
  // записую метод app.instance().назва методу();
  // записую значення стейт expect(app.state().назва властивості).toBeFalsy();
});



