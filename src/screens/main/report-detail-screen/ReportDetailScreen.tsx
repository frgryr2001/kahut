import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getPlayDetail} from '../../../services/play/play.service';
import {PlayDetail} from '../../../types/play.type';

interface CardProps {
  answer: {
    type: string;
    inOrder: number;
    media: string;
    question: string;
    userAnswer: {
      id: number;
      text?: string;
      image?: string;
    };
    correctAnswer: {
      id: number;
      text?: string;
      image?: string;
    };
    isCorrect: boolean;
  };
}

const Card = ({answer}: CardProps) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        height: 'auto',
        gap: 16,
      }}>
      <Text style={{color: '#777', fontWeight: '700'}}>
        {answer.inOrder} - {answer.type}
      </Text>

      <View style={{flexDirection: 'row', gap: 16, alignItems: 'flex-start'}}>
        {answer.media && (
          <Image
            source={{uri: answer.media}}
            style={{
              width: 70,
              height: 45,
              objectFit: 'cover',
            }}
          />
        )}

        <Text
          style={{
            color: colors.text,
            flex: 1,
            lineHeight: 18,
            fontWeight: '700',
          }}>
          {answer.question}
        </Text>
      </View>

      <View style={{gap: 8}}>
        <Text style={{color: colors.text, fontWeight: '700'}}>
          Your answered
        </Text>

        {answer.isCorrect ? (
          // Correct
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#10872a',
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {answer.userAnswer.text && (
              <Text style={{color: '#fff', fontWeight: '700'}}>
                {answer.userAnswer.text}
              </Text>
            )}

            {answer.userAnswer.image && (
              <Image
                source={{uri: answer.userAnswer.image}}
                style={{
                  width: 70,
                  height: 40,
                  objectFit: 'cover',
                }}
              />
            )}

            <Icon name="check" size={24} color="#fff" />
          </View>
        ) : (
          // Incorrect
          <View
            style={{
              gap: 16,
            }}>
            {/* User answer */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#e00d18',
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {answer.userAnswer.text && (
                <Text style={{color: '#fff', fontWeight: '700'}}>
                  {answer.userAnswer.text}
                </Text>
              )}

              {answer.userAnswer.image && (
                <Image
                  source={{uri: answer.userAnswer.image}}
                  style={{
                    width: 70,
                    height: 40,
                    objectFit: 'cover',
                  }}
                />
              )}
              <Icon name="close" size={24} color="#fff" />
            </View>

            {/* Correct answer */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#10872a',
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {answer.correctAnswer.text && (
                <Text style={{color: '#fff', fontWeight: '700'}}>
                  {answer.correctAnswer.text}
                </Text>
              )}

              {answer.correctAnswer.image && (
                <Image
                  source={{uri: answer.correctAnswer.image}}
                  style={{
                    width: 70,
                    height: 40,
                    objectFit: 'cover',
                  }}
                />
              )}

              <Icon name="check" size={24} color="#fff" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const ReportDetailScreen = ({route}: any) => {
  const {id, kahootId, assignmentId} = route.params;
  console.log(route.params);
  const [data, setData] = useState<PlayDetail>();

  useEffect(() => {
    const getData = async () => {
      const response = await getPlayDetail({
        id,
        kahootId,
        assignmentId,
      });
      if (response) {
        setData(response);
      }
    };

    getData();
  }, [id, kahootId, assignmentId]);

  return data ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#20065c',
        padding: 16,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Point: {data.point}
      </Text>

      <View
        style={{
          gap: 16,
          marginTop: 16,
        }}>
        {data.answers
          .sort((a, b) => a.inOrder - b.inOrder)
          .map(answer => (
            <Card key={JSON.stringify(answer)} answer={answer} />
          ))}
      </View>
    </View>
  ) : (
    <View style={{padding: 16, flex: 1, backgroundColor: '#20065c'}}>
      <ActivityIndicator color="#fff" size={40} />
    </View>
  );
};

export default ReportDetailScreen;
