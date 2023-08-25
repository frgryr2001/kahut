import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';

import {
  EmptyMessage,
  KahootListItem,
  KahootListItemSkeleton,
} from '../../../../../../../components/ui';
import {KahootSummary} from '../../../../../../../types/kahoot.type';
import {selectStatus} from '../../../../../../../redux/slices/authSlice/selector';
import {getSharedKahootsList} from '../../../../../../../services/kahoot/kahoot.service';

const SharedScreen = () => {
  const authStatus = useSelector(selectStatus);
  const [kahootsList, setKahootsList] = useState<KahootSummary[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      getSharedKahootsList({
        page: 1,
        limit: 999,
      })
        .then(response => {
          setKahootsList(response.kahoots);
          setIsFetching(false);
        })
        .catch(error => console.error(error));
    }
  }, [authStatus, isRefreshing]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 8,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            gap: 16,
          }}>
          {isFetching && (
            <>
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
            </>
          )}
          {kahootsList && kahootsList.length === 0 && (
            <EmptyMessage
              messages={[
                'Looks empty here... No one shared any kahoots with you yet.',
              ]}
            />
          )}

          {kahootsList &&
            kahootsList.length > 0 &&
            kahootsList.map(kahoot => (
              <KahootListItem key={kahoot.id} kahoot={kahoot} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SharedScreen;
