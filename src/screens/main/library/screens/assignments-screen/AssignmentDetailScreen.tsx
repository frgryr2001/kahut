import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import {Player} from '../../../../../types/play.type';
import {getTopPlayers} from '../../../../../services/play/play.service';
import {formattedDate} from '../../../../../helpers/formattedDate';

const AssignmentDetailScreen = ({navigation, route}: any) => {
  const {colors} = useTheme();
  const {assignment} = route.params;
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [copiedText, setCopiedText] = React.useState('');

  useEffect(() => {
    if (assignment) {
      getTopPlayers({assignmentId: assignment.id}).then(data => {
        setIsFetching(false);
        setTopPlayers(data);
      });
    }
  }, [assignment]);

  const copyToClipboard = () => {
    Clipboard.setString(assignment.pin);

    Clipboard.getString().then(text => {
      setCopiedText(text);
    });
  };

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
        <>
          <ScrollView style={{flex: 1, gap: 16}}>
            {topPlayers.map((player, index) => (
              <Pressable
                key={player.id}
                onPress={() => {
                  navigation.push('ReportDetailScreen', {
                    id: player.id,
                    kahootId: null,
                    assignmentId: assignment.id,
                    kahootName: assignment.title,
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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}>
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
        </>
      )}

      <View
        style={{
          paddingHorizontal: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 16,
        }}>
        <Pressable
          onPress={() => setIsShowModal(true)}
          style={{
            paddingHorizontal: 36,
            paddingVertical: 14,
            borderRadius: 4,
            alignItems: 'center',
            backgroundColor: '#2456bf',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontWeight: '700',
            }}>
            Share
          </Text>
        </Pressable>
      </View>

      <Modal
        isVisible={isShowModal}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        onBackdropPress={() => setIsShowModal(false)}>
        <View
          style={{
            padding: 16,
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <Pressable
            onPress={copyToClipboard}
            style={{
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: '#eee',
            }}>
            <View
              style={{
                position: 'absolute',
                right: -10,
                top: -10,
              }}>
              {copiedText ? (
                <Text style={{color: colors.text}}>Copied</Text>
              ) : null}
            </View>

            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                letterSpacing: 2,
                fontWeight: 'bold',
              }}>
              {assignment.pin}
            </Text>
          </Pressable>
          <View
            style={{
              marginBottom: 10,
              marginTop: 5,
            }}>
            {/* <QRCode value={assignment.pin} /> */}
          </View>
          <Text style={{color: colors.text}}>Deadline</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: colors.text,
              marginTop: 10,
            }}>
            {formattedDate(assignment.expiredAt)}
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AssignmentDetailScreen;
