import React from 'react';
import {FlatList, View} from 'react-native';
import {KahootSliderItem} from '../';
import {KahootSummary} from '../../../types/kahoot.type';
import styles from './KahootSlider.style';

interface Props {
  kahootsList: KahootSummary[];
  loadMore?: () => void;
  onItemPress?: (kahootID: number, isMyKahoot: boolean) => void;
  isMyKahoot?: boolean;
}

const KahootSlider = ({
  kahootsList,
  loadMore,
  onItemPress,
  isMyKahoot,
}: Props) => {
  const itemSeparatorItem = () => (
    <View
      style={{
        width: 10,
      }}
    />
  );
  const renderItem = ({item}: {item: KahootSummary}) => {
    return (
      <KahootSliderItem
        key={item.id}
        kahoot={item}
        isDraft={item.isDraft}
        onItemPress={onItemPress}
        isMyKahoot={isMyKahoot}
      />
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
      onEndReached={loadMore}
      onEndReachedThreshold={-0.5}
      onMomentumScrollBegin={() => {
        if (loadMore) {
          loadMore();
        }
      }}
    />
  );
};

// const HomeKahootList = ({kahootsList, loadMore}: Props) => {
//   return <FlatListItemKahoot kahootsList={kahootsList} loadMore={loadMore} />;
// };

export default KahootSlider;
