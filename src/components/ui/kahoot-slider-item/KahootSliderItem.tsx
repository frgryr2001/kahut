import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {KahootSummary} from '../../../types/kahoot.type';
import styles from './KahootSliderItem.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {getKahootDetail as getKahootDetailByAPI} from '../../../services/kahoot/kahoot.service';
import {useAppDispatch} from '../../../redux/store';
import {initQuestion} from '../../../redux/slices/questionSlice/reducer';
import {Question, theme} from '../../../types/question';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: KahootSummary & {questions?: []};
}

const WIDTH = Math.round((Dimensions.get('window').width - 40) / 2);

const KahootSliderItem = ({isDraft = false, kahoot}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const getKahootDetail = async () => {
    const response = await getKahootDetailByAPI(kahoot.id);
    if (response) {
      const initQuestionData: Question = {
        idQuestion: response.id,
        userId: response.userId,
        coverImage: response.coverImage,
        title: response.title,
        theme: (response.theme.charAt(0).toUpperCase() +
          response.theme.slice(1)) as theme,
        description: response.description,
        media: response.media,
        visibleScope: response.visibleScope as 'public' | 'private',
        questions: response.questions as any,
        images: [],
        deletedQuestionIds: [],
        deletedAnswerIds: [],
      };
      dispatch(initQuestion(initQuestionData));
      return initQuestionData;
    }
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        const initQuestionData = await getKahootDetail();
        navigation.navigate('QuestionScreen', {
          idQuestion: initQuestionData?.idQuestion!,
          isEditAPI: true,
        });
      }}
      activeOpacity={0.8}
      style={[
        {
          width: WIDTH,
          backgroundColor: colors.card,
        },
        styles.container,
      ]}>
      <ImageBackground
        defaultSource={DefaultImage}
        source={
          kahoot.coverImage
            ? {
                uri: kahoot.coverImage,
              }
            : DefaultImage
        }
        style={styles.coverImage}>
        <Text style={styles.numberOfQuestion}>
          {kahoot.numberOfQuestion} Qs
        </Text>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <View style={styles.draftContainer}>
          {isDraft && (
            <Text
              style={[
                {
                  backgroundColor: colors.notification,
                },
                styles.draft,
              ]}>
              Draft
            </Text>
          )}
          <Text
            style={[{color: colors.text}, styles.title]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {kahoot.title}
          </Text>
        </View>

        {!isDraft && kahoot.userImage && (
          <View style={styles.userInfoContainer}>
            <Image
              defaultSource={DefaultImage}
              source={{
                uri: kahoot.userImage,
              }}
              style={styles.userImage}
            />

            <Text
              style={styles.username}
              numberOfLines={1}
              ellipsizeMode="tail">
              {kahoot.username}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default KahootSliderItem;
