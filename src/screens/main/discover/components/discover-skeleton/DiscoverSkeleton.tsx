import React from 'react';
import {View} from 'react-native';

import {KahootSliderItemSkeleton, Skeleton} from '../../../../../components/ui';
import styles from './DiscoverSkeleton.style';

const DiscoverSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Skeleton
          width={200}
          height={10}
          style={{
            borderRadius: 8,
          }}
        />
        <Skeleton
          width={50}
          height={10}
          style={{
            borderRadius: 8,
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <KahootSliderItemSkeleton />
        <KahootSliderItemSkeleton />
      </View>
    </View>
  );
};

export default DiscoverSkeleton;
