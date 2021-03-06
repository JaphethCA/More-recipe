import React from 'react';
import { shallow } from 'enzyme';
import { FavoritesPage } from '../../../Dashboard/containers/FavoritesPage';
import mockData from '../../__mock__/mockData';

const props = {
  favorites: {
    payload: mockData.recipes,
    isFetching: false
  },
  handleGetFavorites: jest.fn(),
};

describe('<FavoritesPage />', () => {
  describe('FavoritesPage Component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<FavoritesPage {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
      expect(wrapper.find('Recipes').length).toBe(1);
    });

    it('should render component with valid favorites props ', () => {
      const wrapper = shallow(<FavoritesPage {...props} />);
      expect(wrapper.instance().props.favorites).toBe(props.favorites);
    });
  });

  describe('componentWillReceiveProps', () => {
    it(
      'should update list of favorites when new recipe is added to favorites',
      () => {
        const wrapper = shallow(<FavoritesPage {...props} />);
        const componentWillReceivePropSpy = jest
          .spyOn(wrapper.instance(), 'componentWillReceiveProps');
        const newProps = {
          favorites: {
            payload: [],
            isFetching: true
          },
          handleGetFavorites: jest.fn(),
        };
        wrapper.setProps({ ...newProps });
        expect(componentWillReceivePropSpy).toHaveBeenCalled();
        expect(wrapper.instance().props.favorites.payload).toEqual([]);
      }
    );
  });

  describe('componentDidMount', () => {
    it('should get users favorites recipes', () => {
      const wrapper = shallow(<FavoritesPage {...props} />);
      const componentDidMountSpy = jest
        .spyOn(wrapper.instance(), 'componentDidMount');
      wrapper.setProps({ ...props, favorites: { payload: [] } });
      wrapper.instance().componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalled();
      expect(wrapper.instance().props.handleGetFavorites).toHaveBeenCalled();
      expect(wrapper.instance().props.favorites.payload).toEqual([]);
    });
  });
});
