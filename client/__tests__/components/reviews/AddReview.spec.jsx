import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import AddReview from '../../../Reviews/components/AddReview';


const props = {
  content: 'new review',
  onChange: jest.fn(),
  onSubmit: jest.fn()
};

describe('<AddReview /> ', () => {
  it('should render without exploding', () => {
    const wrapper = shallow(<AddReview {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(1);
    expect(wrapper.find('textarea').parent().is('div')).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<AddReview {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

