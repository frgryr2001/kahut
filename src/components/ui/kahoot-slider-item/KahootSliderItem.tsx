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
import {SummaryKahoot} from '../../../types/kahoot.type';
import styles from './KahootSliderItem.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: SummaryKahoot;
}

const WIDTH = Math.round((Dimensions.get('window').width - 40) / 2);

const KahootSliderItem = ({isDraft = false, kahoot}: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('QuestionScreen', {
          kahootID: kahoot.id,
        })
      }
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
