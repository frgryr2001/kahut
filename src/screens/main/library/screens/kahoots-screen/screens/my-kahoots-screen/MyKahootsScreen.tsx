import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {
  EmptyMessage,
  KahootBottomSheet,
  KahootListItem,
  KahootListItemSkeleton,
} from '../../../../../../../components/ui';
import {KahootSummary} from '../../../../../../../types/kahoot.type';
import {selectStatus} from '../../../../../../../redux/slices/authSlice/selector';
import {getOwnKahootsList} from '../../../../../../../services/kahoot/kahoot.service';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const MyKahootsScreen = () => {
  const authStatus = useSelector(selectStatus);
  const [ownKahootsList, setOwnKahootsList] = useState<KahootSummary[]>();
  const [isFetchingOwnKahootsList, setIsFetchingOwnKahootsList] =
    useState<boolean>(true);
  const [kahootDetailConfig, setKahootDetailConfig] = useState<{
    kahootID: number;
    isMyKahoot: boolean;
  }>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      getOwnKahootsList()
        .then(response => {
          setOwnKahootsList(response.kahoots);
          setIsFetchingOwnKahootsList(false);
        })
        .catch(error => console.error(error));
    }
  }, [authStatus, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // open bottom sheet
  const handlePresentModalPress = useCallback((kahootID: number) => {
    setKahootDetailConfig({kahootID, isMyKahoot: true});
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 8,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {isFetchingOwnKahootsList && (
            <>
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
            </>
          )}
          {ownKahootsList && ownKahootsList.length === 0 && (
            <EmptyMessage messages={['Looks empty here...']} />
          )}

          {ownKahootsList &&
            ownKahootsList.length > 0 &&
            ownKahootsList.map(kahoot => (
              <KahootListItem
                key={kahoot.id}
                kahoot={kahoot}
                handleKahootListItemPress={handlePresentModalPress}
              />
            ))}

          <KahootBottomSheet
            ref={bottomSheetModalRef}
            kahootDetailConfig={kahootDetailConfig}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyKahootsScreen;
