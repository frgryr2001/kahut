import React from 'react';
import {EmptyMessage} from '../../../../../../../components/ui';

const FavoritesScreen = () => {
  return (
    <EmptyMessage
      messages={[
        'Looks empty here... Keep track of all your favorite kahoots!',
        "Favorite a kahoot by tapping the heart icon and it'll be added here",
      ]}
    />
  );
};

export default FavoritesScreen;
