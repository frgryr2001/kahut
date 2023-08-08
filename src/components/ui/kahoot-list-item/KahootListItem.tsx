import {View, Text, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './KahootListItem.style';
import {KahootSummary} from '../../../types/kahoot.type';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: KahootSummary;
  navigation?: any;
}

const KahootListItem = ({isDraft = false, kahoot, navigation}: Props) => {
  const {colors} = useTheme();
  // const numberOfQuestionInLocal = (kahoot as any).questions.length;

  const handleEditWithDraftKaHoot = () => {
    if (isDraft) {
      console.log(
        'KahootListItem.tsx: handleEditWithDraftKaHoot: isDraft: ',
        isDraft,
      );

      navigation.navigate('QuestionScreen', {
        question: kahoot,
      });
    }
  };

  return (
    <Pressable
      onPress={() => handleEditWithDraftKaHoot()}
      style={[
        {
          backgroundColor: colors.card,
        },
        styles.container,
      ]}>
      <ImageBackground
        defaultSource={DefaultImage}
        source={
          kahoot.coverImage
            ? {
                uri: kahoot.coverImage.startsWith('http')
                  ? kahoot.coverImage
                  : `file:///data/user/0/com.kahut/cache/${kahoot.coverImage}`,
              }
            : DefaultImage
        }
        style={styles.coverImage}>
        <Text style={styles.numberOfQuestion}>
          {kahoot.numberOfQuestion || 0} Qs
        </Text>
      </ImageBackground>

      <View style={styles.rightContainer}>
        <View>
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}>
            <Text style={{color: '#777', fontSize: 12}}>
              {new Date(kahoot.createdAt!).toLocaleDateString()}
            </Text>
            <Text style={{color: '#777', fontSize: 20}}>&#183;</Text>
            <Text style={{color: '#777', fontSize: 12}}>0 plays</Text>
          </View>
        </View>

        <View style={styles.visibleScopeContainer}>
          <Icon
            name={
              kahoot.visibleScope === 'private' ? 'account-outline' : 'earth'
            }
            size={20}
            color="#777"
          />
          <Text
            style={{
              color: '#777',
            }}>
            {kahoot.visibleScope!.charAt(0).toUpperCase() +
              kahoot.visibleScope!.slice(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default KahootListItem;
