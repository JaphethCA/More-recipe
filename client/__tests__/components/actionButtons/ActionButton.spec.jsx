import React from 'react';
import { shallow } from 'enzyme';
import { ActionButtons } from '../../../ActionButtons/containers/ActionButtons';
import mockData from '../../__mock__/mockData';
import mockStore from '../../__mock__/configMockStore';


const props = {
  hidden: false,
  recipe: mockData.recipe,
  favorites: mockData.recipes,
  handleUpvote: jest.fn(),
  handleDownvote: jest.fn(),
  handleAddToFavorites: jest.fn(),
  handleRemoveFromFavorites: jest.fn()
};

const event = {
  preventDefault: jest.fn()
};

const store = mockStore({
  recipeReducer:
  { favorites: { payload: mockData.recipes } }
});

const state = {
  favorites: mockData.recipes
};


describe('<ActionButtons />', () => {
  describe('ActionButtons component', () => {
    it('should render without exploding', () => {
      const wrapper = shallow(<ActionButtons {...state} {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').length).toBe(1);
      expect(wrapper.find('ul').length).toBe(1);
      expect(wrapper.find('li').length).toBe(4);
      expect(wrapper.find('ul').hasClass('btn-list')).toBe(true);
      expect(wrapper.find('ReviewButton').length).toBe(1);
      expect(wrapper.find('UpvoteButton').length).toBe(1);
      expect(wrapper.find('DownvoteButton').length).toBe(1);
      expect(wrapper.find('FavoritesButton').length).toBe(1);
    });
  });


  describe('handleDownvote()', () => {
    it('should downvote recipe when the downvote button is clicked', () => {
      const wrapper = shallow(<ActionButtons {...state} {...props} />);
      const downvoteButton = wrapper.find('DownvoteButton')
        .dive().find('button');
      const handledownvoteSpy = jest
        .spyOn(wrapper.instance().props, 'handleDownvote');
      wrapper.setProps({ ...props });
      downvoteButton.simulate('click', event);
      expect(handledownvoteSpy).toHaveBeenCalled();
    });
  });

  describe('handleUpvote()', () => {
    it('should upvote recipe when the upvote button is clicked', () => {
      const wrapper = shallow(<ActionButtons {...state} {...props} />);
      const handleupvoteSpy = jest
        .spyOn(wrapper.instance().props, 'handleUpvote');
      const upvoteButton = wrapper.find('UpvoteButton').dive().find('button');
      upvoteButton.simulate('click', event);
      expect(handleupvoteSpy).toHaveBeenCalled();
    });
  });

  describe('handleRemoveFromFavorites()', () => {
    it(
      'should remove recipe from favorites when the favorite button is clicked',
      () => {
        const wrapper = shallow(<ActionButtons {...state} {...props} />);
        const favoriteButton = wrapper.find('FavoritesButton')
          .dive().find('button');
        const handleRemoveFromFavoritesSpy = jest
          .spyOn(wrapper.instance().props, 'handleRemoveFromFavorites');

        favoriteButton.simulate('click', event);
        expect(handleRemoveFromFavoritesSpy).toHaveBeenCalled();
      }
    );
  });

  describe('handleAddToFavorites()', () => {
    it(
      'should add recipe to favorites when favorites button is clicked',
      () => {
        const wrapper = shallow(<ActionButtons {...state} {...props} />);
        const favoriteButton = wrapper.find('FavoritesButton')
          .dive().find('button');
        const handleAddToFavoritesSpy = jest
          .spyOn(wrapper.instance().props, 'handleAddToFavorites');
        wrapper.setProps({ ...props, recipe: { id: 50, name: 'ogbono soup' } });
        favoriteButton.simulate('click', event);
        expect(handleAddToFavoritesSpy).toHaveBeenCalled();
      }
    );
  });

  describe('componentWillReceiveProps', () => {
    it('should update state when new props arrives ', () => {
      const wrapper = shallow(<ActionButtons {...state} {...props} />);
      const componentWillReceivePropsSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      const newProps = {
        favorites: mockData.favorites
      };
      wrapper.setProps({ ...newProps });
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
      expect(wrapper.instance().state.favorites).toBe(mockData.favorites);
    });
  });
});
