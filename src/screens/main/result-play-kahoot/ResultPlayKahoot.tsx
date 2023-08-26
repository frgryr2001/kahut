import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import {getPlayDetail} from '../../../services/play/play.service';
import {PlayDetail} from '../../../types/play.type';
import {Button} from '../../../components/ui';
import KahootResult from '../../../components/ui/kahoot-result/KahootResult';

interface Props
  extends StackScreenProps<RootStackParams, 'ResultPlayKahootScreen'> {}

const height = Dimensions.get('window').height;
export default function ResultPlayKahootScreen({navigation, route}: Props) {
  const {id, kahootId, assignmentId, kahootObj} = route.params;
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#20065c',
      }}>
      <ScrollView
        style={{
          height: assignmentId ? height : height - 45,
        }}>
        <KahootResult data={data!} hasAssign={Boolean(assignmentId)} />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: kahootObj?.isPlayed ? 'flex-start' : 'space-around',
          backgroundColor: '#20065c',
          padding: 16,
        }}>
        <Button
          title="Back to home"
          onPress={() => {
            navigation.goBack();
          }}
          size="medium"
          width={kahootObj?.isPlayed ? '100%' : '48%'}
          style={{
            backgroundColor: '#fff',
            color: '#20065c',
          }}
        />
        {!kahootObj?.isPlayed && (
          <Button
            title={assignmentId ? 'Practice' : 'Play again'}
            onPress={() => {
              if (kahootObj) {
                let copyKahoot = {...kahootObj};

                if (assignmentId) {
                  copyKahoot.id = kahootId!;
                }
                navigation.replace('PlayScreen', {
                  kahoot: copyKahoot,
                });
              }
            }}
            width={'48%'}
            size="medium"
            isActive
          />
        )}
      </View>
    </SafeAreaView>
  );
}
