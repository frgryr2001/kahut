import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {EmptyMessage, KahootListItem} from '../../../../../components/ui';
import {selectQuestions} from '../../../../../redux/slices/questionSlice/selector';

const DraftScreen = ({navigation}: any) => {
  const kahoots = useSelector(selectQuestions);
  const filterKahootByIsDraft = kahoots?.filter((item: any) => item?.isDraft);
  console.log(kahoots);
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
        padding: 8,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            gap: 8,
          }}>
          {filterKahootByIsDraft && filterKahootByIsDraft.length === 0 && (
            <EmptyMessage messages={['Looks empty here...']} />
          )}

          {filterKahootByIsDraft &&
            filterKahootByIsDraft.length > 0 &&
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
