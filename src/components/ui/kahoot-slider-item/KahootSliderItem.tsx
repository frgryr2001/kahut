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
import {KahootSummary} from '../../../types/kahoot.type';
import styles from './KahootSliderItem.style';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: KahootSummary & {questions?: []};
  onItemPress?: (kahootID: number, isMyKahoot: boolean) => void;
  isMyKahoot?: boolean;
}

const WIDTH = Math.round((Dimensions.get('window').width - 40) / 2);

const KahootSliderItem = ({
  isDraft = false,
  kahoot,
  onItemPress,
  isMyKahoot = false,
}: Props) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={async () => {
        onItemPress && onItemPress(kahoot.id, isMyKahoot);
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
