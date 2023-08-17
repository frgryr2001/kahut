import React, {useRef, useState} from 'react';
import {View} from 'react-native';

import {
  KahootListItemSkeleton,
  EmptyMessage,
  KahootListItem,
  KahootBottomSheet,
} from '../../../../../components/ui/';
import {KahootSummary} from '../../../../../types/kahoot.type';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

interface Props {
  data?: KahootSummary[];
  isMyKahoots?: boolean;
}


const KahootsList = ({data, isMyKahoots}: Props) => {
  const [kahootDetailConfig, setKahootDetailConfig] = useState<{
    kahootID: number;
    isMyKahoot: boolean;
  }>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleKahootListItemPress = (kahootID: number) => {
    setKahootDetailConfig({kahootID, isMyKahoot: isMyKahoots!});
    bottomSheetModalRef.current?.present();
  };

  return (
    <View
      style={{
        gap: 16,
        padding: 16,
      }}>
      {!data && (
        <>
          <KahootListItemSkeleton />
          <KahootListItemSkeleton />
          <KahootListItemSkeleton />
        </>
      )}
      {data && data.length === 0 && (
        <EmptyMessage messages={['Looks empty here...']} />
      )}
      {data &&
        data.length > 0 &&
        data.map(kahoot => (
          <KahootListItem
            key={kahoot.id}
            kahoot={kahoot}
            handleKahootListItemPress={handleKahootListItemPress}
          />
        ))}

      <KahootBottomSheet
        ref={bottomSheetModalRef}
        kahootDetailConfig={kahootDetailConfig}
      />
    </View>
  );
};

export default KahootsList;
