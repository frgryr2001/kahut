import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {selectStatus} from '../../../../../redux/slices/authSlice/selector';
import {getPlaysList} from '../../../../../services/play/play.service';
import {PlaySummary} from '../../../../../types/play.type';
import {EmptyMessage} from '../../../../../components/ui';
import styles from './ReportScreen.style';
import {ScrollView} from 'react-native';
import {formattedDate} from '../../../../../helpers/formattedDate';

export default function ReportScreen({navigation}: any) {
  const {colors} = useTheme();
  const authStatus = useSelector(selectStatus);
  const [playsList, setPlaysList] = useState<PlaySummary[]>();

  useEffect(() => {
    const getPlaysListData = async () => {
      const response = await getPlaysList();
      setPlaysList(response);
    };
    getPlaysListData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {authStatus === 'authenticated' &&
          (playsList ? (
            <>
              {playsList.length === 0 && (
                <View>
                  <EmptyMessage messages={['Looks empty here...']} />
                </View>
              )}
              {playsList.length > 0 && (
                <View style={styles.authContainer}>
                  {playsList.map(play => (
                    <View
                      key={play.id}
                      style={{
                        width: '100%',
                        borderRadius: 10,
                        padding: 8,
                      }}>
                      <Pressable
                        style={{
                          width: '100%',
                          gap: 4,
                          elevation: 4,
                          shadowColor: '#00000040',
                          overflow: 'hidden',
                          borderRadius: 10,
                          backgroundColor: '#fff',
                          padding: 16,
                        }}
                        onPress={() =>
                          navigation.push('ReportDetailScreen', {
                            id: play.id,
                            kahootId: play.kahootId,
                            assignmentId: play.assignmentId,
                            kahootName: play.kahootTitle,
                          })
                        }>
                        <Text style={{color: '#777', fontSize: 14}}>
                          {formattedDate(play.createdAt)}
                        </Text>
                        <Text
                          style={{
                            color: colors.text,
                            fontWeight: '700',
                            fontSize: 16,
                          }}>
                          {play.kahootTitle}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 2,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                          }}>
                          <Icon name="account" size={24} color={colors.text} />
                          <Text
                            style={{
                              color: colors.text,
                              fontWeight: '700',
                              fontSize: 14,
                            }}>
                            {play.numberOfPlayer}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </>
          ) : (
            <ActivityIndicator size={40} color={colors.text} />
          ))}

        {authStatus === 'not-authenticated' && (
          <View style={styles.notAuthContainer}>
            <Text
              style={{
                color: colors.text,
                ...styles.notAuthTitle,
              }}>
              Log in to Kahoot!
            </Text>

            <Text style={styles.notAuthDesc}>
              Log in or sign up to be able to play your kahoots and access them
              on other devices.
            </Text>

            <View style={styles.notAuthButtonGroup}>
              <Pressable
                onPress={() => navigation.push('LoginScreen')}
                style={{
                  backgroundColor: '#2456bf',
                  ...styles.notAuthButtonContainer,
                }}>
                <Text style={styles.notAuthButtonText}>Sign in</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.push('RegisterScreen')}
                style={{
                  backgroundColor: '#10872a',
                  ...styles.notAuthButtonContainer,
                }}>
                <Text style={styles.notAuthButtonText}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
