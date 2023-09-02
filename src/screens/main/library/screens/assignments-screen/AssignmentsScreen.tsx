import React, {useState, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import {selectStatus} from '../../../../../redux/slices/authSlice/selector';
import {
  NotAuthForm,
  KahootListItemSkeleton,
  EmptyMessage,
  KahootListItem,
} from '../../../../../components/ui';
import {AssignmentSummary} from '../../../../../types/assignment.type';
import {getAssignmentsList} from '../../../../../services/assignment/assignment.service';

const AssignmentsScreen = ({navigation}: any) => {
  const authStatus = useSelector(selectStatus);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [assignmentsList, setAssignmentsList] = useState<AssignmentSummary[]>();
  const [isFetchingAssignmentsList, setIsFetchingAssignmentsList] =
    useState<boolean>(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      getAssignmentsList()
        .then(response => {
          setAssignmentsList(response);
          setIsFetchingAssignmentsList(false);
        })
        .catch(error => console.error(error));
    }
  }, [authStatus, refreshing]);

  return (
    <SafeAreaView
      style={{
        padding: 8,
      }}>
      {authStatus === 'not-authenticated' && (
        <View style={{padding: 8}}>
          <NotAuthForm navigation={navigation} />
        </View>
      )}

      {authStatus === 'authenticated' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View>
            {isFetchingAssignmentsList && (
              <>
                <KahootListItemSkeleton />
                <KahootListItemSkeleton />
                <KahootListItemSkeleton />
              </>
            )}
            {assignmentsList && assignmentsList.length === 0 && (
              <EmptyMessage messages={['Looks empty here...']} />
            )}

            {assignmentsList &&
              assignmentsList.length > 0 &&
              assignmentsList.map(assignment => (
                <KahootListItem
                  key={assignment.id}
                  kahoot={assignment}
                  handleKahootListItemPress={() =>
                    navigation.navigate('LibraryAssignmentDetailScreen', {
                      assignment: assignment,
                    })
                  }
                />
              ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AssignmentsScreen;
