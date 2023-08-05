import {View, Text, ImageBackground, Image, Dimensions} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {SummaryKahoot} from '../../../types/kahoot.type';
import styles from './KahootSliderItem.style';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: SummaryKahoot;
}

const WIDTH = Math.round((Dimensions.get('window').width - 40) / 2);

const KahootSliderItem = ({isDraft = false, kahoot}: Props) => {
  const {colors} = useTheme();

  return (
    <View
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

        <View style={styles.userInfoContainer}>
          <Image
            defaultSource={DefaultImage}
            source={{
              uri: kahoot.userImage,
            }}
            style={styles.userImage}
          />

          <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
            {kahoot.username}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default KahootSliderItem;
