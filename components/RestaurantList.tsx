import React from 'react';
import {FlatList} from 'react-native';
import {Restaurant} from '../types/Restaurant';
import RestaurantCard from './RestaurantCard';

interface renderRestaurantItemProps {
  item: Restaurant;
}

const renderResturantItem = ({item: restaurant}: renderRestaurantItemProps) => (
  <RestaurantCard
    title={restaurant.name}
    address={restaurant.geo.address}
    url={restaurant.url}
  />
);

interface RestaurantsProps {
  restaurants: Restaurant[];
}

const RestaurantList = ({restaurants}: RestaurantsProps) => (
  <FlatList
    data={restaurants}
    renderItem={renderResturantItem}
    keyExtractor={item => item.name}
  />
);

export default RestaurantList;
