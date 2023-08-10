import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {KahootListItem} from '../../../../../components/ui';
// import {selectStatus} from '../../../../../redux/slices/authSlice/selector';
import {selectQuestions} from '../../../../../redux/slices/questionSlice/selector';

const DraftScreen = ({navigation}: any) => {
  const kahoots = useSelector(selectQuestions);
  const filterKahootByIsDraft = kahoots?.filter((item: any) => item?.isDraft);
  const handleEditWithDraftKaHoot = (
    isDraft: boolean,
    kahootIdDraft: string,
  ) => {
    if (isDraft) {
      navigation.navigate('QuestionScreen', {
        idQuestion: kahootIdDraft,
        isEdit: true,
      });
    }
  };
  return (
    <SafeAreaView
      style={{
        padding: 16,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            gap: 16,
          }}>
          {filterKahootByIsDraft &&
            filterKahootByIsDraft.map(kahoot => {
              return (
                <KahootListItem
                  kahoot={kahoot as any}
                  key={kahoot?.idQuestion}
                  isDraft={kahoot?.isDraft}
                  numberOfQuestionInLocal={kahoot?.questions?.length}
                  handleEditWithDraftKaHoot={handleEditWithDraftKaHoot}
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DraftScreen;
