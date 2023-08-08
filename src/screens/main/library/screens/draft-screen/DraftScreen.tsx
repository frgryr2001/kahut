import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {KahootListItem} from '../../../../../components/ui';
import {selectStatus} from '../../../../../redux/slices/authSlice/selector';
import {selectQuestions} from '../../../../../redux/slices/questionSlice/selector';

const DraftScreen = ({navigation}: any) => {
  const authStatus = useSelector(selectStatus);
  const kahoot = useSelector(selectQuestions);

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
          {kahoot &&
            kahoot.map(kh => (
              <KahootListItem
                kahoot={kh as any}
                key={kh.idQuestion}
                isDraft={kh.isDraft}
                numberOfQuestionInLocal={kh.questions.length}
                handleEditWithDraftKaHoot={handleEditWithDraftKaHoot}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DraftScreen;
