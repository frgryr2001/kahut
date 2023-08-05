import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {SummaryKahoot} from '../../../types/kahoot.type';
import styles from './KahootSummaryItem.style';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: SummaryKahoot & {questions?: []};
}

const WIDTH = Math.round((Dimensions.get('window').width - 40) / 2);

const KahootSummaryItem = ({isDraft = false, kahoot}: Props) => {
  const {colors} = useTheme();
  const numberOfQuestionLocal = kahoot.questions?.length;

  return (
    <TouchableOpacity
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
                uri: isDraft
                  ? `file:///data/user/0/com.kahut/cache/${kahoot.coverImage}`
                  : kahoot.coverImage,
              }
            : DefaultImage
        }
        style={styles.coverImage}>
        <Text style={styles.numberOfQuestion}>
          {kahoot.numberOfQuestion || numberOfQuestionLocal} Qs
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

export default KahootSummaryItem;
