import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import {getPlayDetail} from '../../../services/play/play.service';
import {PlayDetail} from '../../../types/play.type';
import {Button} from '../../../components/ui';
import KahootResult from '../../../components/ui/kahoot-report-list/KahootResult';

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
    <SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: '#20065c',
          height: height - 45,
        }}>
        <KahootResult data={data!} hasAssign />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',

          backgroundColor: '#20065c',

          padding: 16,
        }}>
        <Button
          title="Back to home"
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          size="medium"
          width={'48%'}
          style={{
            backgroundColor: '#fff',
            color: '#20065c',
          }}
        />
        <Button
          title={assignmentId ? 'Rank' : 'Play again'}
          onPress={() => {
            if (assignmentId) {
              console.log('rank');
              return;
            }
            navigation.replace('PlayScreen', {
              kahoot: kahootObj,
            });
          }}
          width={'48%'}
          size="medium"
          isActive
        />
      </View>
    </SafeAreaView>
  );
}
