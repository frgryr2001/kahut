import React from 'react';
import {View} from 'react-native';

import {KahootSliderItemSkeleton} from '../../../../../components/ui';
import styles from './HomeSkeleton.style';

const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <KahootSliderItemSkeleton />
      <KahootSliderItemSkeleton />
    </View>
  );
};

export default HomeSkeleton;
