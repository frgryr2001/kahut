import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';

import {
  KahootListItem,
  KahootListItemSkeleton,
} from '../../../../../../../components/ui';
import {SummaryKahoot} from '../../../../../../../types/kahoot.type';
import {selectStatus} from '../../../../../../../redux/slices/authSlice/selector';
import {getOwnKahootsList} from '../../../../../../../services/kahoot/kahoot.service';

const MyKahootsScreen = () => {
  const authStatus = useSelector(selectStatus);
  const [ownKahootsList, setOwnKahootsList] = useState<SummaryKahoot[]>();
  const [isFetchingOwnKahootsList, setIsFetchingOwnKahootsList] =
    useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      getOwnKahootsList()
        .then(response => {
          setOwnKahootsList(response);
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

  return (
    <SafeAreaView
      style={{
        padding: 16,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            gap: 16,
          }}>
          {isFetchingOwnKahootsList && (
            <>
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
            </>
          )}
          {ownKahootsList &&
            ownKahootsList.map(kahoot => (
              <KahootListItem kahoot={kahoot} key={kahoot.id} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyKahootsScreen;
