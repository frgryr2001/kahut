import {FlatList, View} from 'react-native';
import React from 'react';
import {KahootSliderItem} from '../../../../../components/ui';
import styles from './HomeKahootList.style';
import {SummaryKahoot} from '../../../../../types/kahoot.type';

interface Props {
  kahootsList: SummaryKahoot[];
  loadMore?: () => void;
}

function FlatListItemKahoot({kahootsList, loadMore}: Props) {
  const itemSeparatorItem = () => (
    <View
      style={{
        width: 10,
      }}
    />
  );
  const renderItem = ({item}: {item: SummaryKahoot}) => {
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
      onEndReached={loadMore}
      onEndReachedThreshold={-0.5}
      onMomentumScrollBegin={() => {
        if (loadMore) {
          loadMore();
        }
      }}
    />
  );
}

const HomeKahootList = ({kahootsList, loadMore}: Props) => {
  return <FlatListItemKahoot kahootsList={kahootsList} loadMore={loadMore} />;
};

export default HomeKahootList;
