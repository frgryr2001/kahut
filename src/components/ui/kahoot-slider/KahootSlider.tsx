import React from 'react';
import {FlatList, View} from 'react-native';

import {KahootSliderItem} from '../';
import {KahootSummary} from '../../../types/kahoot.type';
import styles from './KahootSlider.style';

interface Props {
  kahootsList: KahootSummary[];
}

const KahootSlider = ({kahootsList}: Props) => {
  const itemSeparatorItem = () => (
    <View
      style={{
        width: 10,
      }}
    />
  );
  const renderItem = ({item}: {item: KahootSummary}) => {
    return (
      <KahootSliderItem key={item.id} kahoot={item} isDraft={item.isDraft} />
    );
  };

  return (
    <FlatList
      data={kahootsList}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => itemSeparatorItem()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default KahootSlider;
