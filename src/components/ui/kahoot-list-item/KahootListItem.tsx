import {View, Text, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './KahootListItem.style';
import {SummaryKahoot} from '../../../types/kahoot.type';

const DefaultImage = require('../../../assets/images/default.png');

interface Props {
  isDraft?: boolean;
  kahoot: SummaryKahoot;
  navigation?: any;
}

const KahootListItem = ({isDraft = false, kahoot, navigation}: Props) => {
  const {colors} = useTheme();
  const numberOfQuestionInLocal = (kahoot as any).questions.length;

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
          {kahoot.numberOfQuestion || numberOfQuestionInLocal} Qs
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
            <Text style={{color: '#777', fontSize: 12}}>1 month ago</Text>
            <Text style={{color: '#777', fontSize: 20}}>&#183;</Text>
            <Text style={{color: '#777', fontSize: 12}}>0 plays</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
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
            {kahoot
              .visibleScope!.replace(
                /(?:^\w|[A-Z]|\b\w)/g,
                function (word, index) {
                  return index === 0 ? word.toLowerCase() : word.toUpperCase();
                },
              )
              .replace(/\s+/g, '')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default KahootListItem;
