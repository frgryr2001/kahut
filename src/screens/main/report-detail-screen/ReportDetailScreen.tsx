import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {getPlayDetail} from '../../../services/play/play.service';
import {PlayDetail} from '../../../types/play.type';
import {CardReportAnswer} from '../../../components/ui';

const ReportDetailScreen = ({route}: any) => {
  const {id, kahootId, assignmentId} = route.params;
  const [data, setData] = useState<PlayDetail>();

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(id, kahootId, assignmentId);
        const response = await getPlayDetail({
          id,
          kahootId,
          assignmentId,
        });
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id, kahootId, assignmentId]);

  return (
    <ScrollView
      style={{
        backgroundColor: '#20065c',
      }}>
      {data ? (
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
                <CardReportAnswer
                  key={JSON.stringify(answer)}
                  answer={answer}
                />
              ))}
          </View>
        </View>
      ) : (
        <View style={{padding: 16, flex: 1, backgroundColor: '#20065c'}}>
          <ActivityIndicator color="#fff" size={40} />
        </View>
      )}
    </ScrollView>
  );
};

export default ReportDetailScreen;
