import React from 'react';
import {FlatList} from 'react-native';
import {Restaurant} from '../types/Restaurant';
import RestaurantCard from './RestaurantCard';

interface renderRestaurantItemProps {
  item: Restaurant;
}

const renderRestaurantItem = ({
  item: restaurant,
}: renderRestaurantItemProps) => (
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
    renderItem={renderRestaurantItem}
    keyExtractor={item => item.name}
  />
);

export default RestaurantList;
