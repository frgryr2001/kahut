import {ScrollView, View} from 'react-native';
import React from 'react';

import {KahootSliderItem} from '../../../../../components/ui';
import styles from './HomeKahootList.style';
import {SummaryKahoot} from '../../../../../types/kahoot.type';

interface Props {
  kahootsList: SummaryKahoot[];
}

const HomeKahootList = ({kahootsList}: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.viewContainer}>
        {kahootsList.map(kahootItem => (
          <KahootSliderItem key={kahootItem.id} kahoot={kahootItem} />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeKahootList;
