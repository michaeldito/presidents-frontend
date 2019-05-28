import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('App component', () => {

  it('should render', () => {
    const app = shallow(<App />);
    expect(app).to.contain(React.Component);
  });
  
});