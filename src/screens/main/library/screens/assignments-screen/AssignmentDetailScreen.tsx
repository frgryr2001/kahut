import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import {Player} from '../../../../../types/play.type';
import {getTopPlayers} from '../../../../../services/play/play.service';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';

const AssignmentDetailScreen = ({navigation, route}: any) => {
  const {colors} = useTheme();
  const {id, title} = route.params;
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (id) {
      getTopPlayers({assignmentId: id}).then(data => {
        setIsFetching(false);
        setTopPlayers(data);
      });
    }
  }, [id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        paddingHorizontal: 8,
        paddingVertical: 16,
        gap: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}>
        <Icons name="ribbon-outline" size={40} color={colors.text} />
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Top high scores
        </Text>
      </View>

      {isFetching && (
        <View>
          <ActivityIndicator size={40} color={colors.text} />
        </View>
      )}

      {topPlayers && (
        <ScrollView style={{flex: 1, gap: 16}}>
          {topPlayers.map((player, index) => (
            <Pressable
              key={player.id}
              onPress={() => {
                navigation.push('ReportDetailScreen', {
                  id: player.id,
                  kahootId: null,
                  assignmentId: id,
                  kahootName: title,
                });
              }}
              style={{
                borderRadius: 10,
                padding: 8,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  padding: 16,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  shadowColor: '#00000040',
                  elevation: 4,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: '800',
                    textAlign: 'center',
                  }}>
                  {index + 1}
                </Text>

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                    <Image
                      source={{uri: player.userImage}}
                      width={40}
                      height={40}
                      borderRadius={999}
                    />
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {player.username}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    {player.point}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AssignmentDetailScreen;
