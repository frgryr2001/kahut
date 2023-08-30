import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {getPlayDetail} from '../../../services/play/play.service';
import {PlayDetail} from '../../../types/play.type';
import KahootResult from '../../../components/ui/kahoot-result/KahootResult';

const ReportDetailScreen = ({route}: any) => {
  const {id, kahootId, assignmentId} = route.params;
  const [data, setData] = useState<PlayDetail>();

  useEffect(() => {
    const getData = async () => {
      try {
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
      <KahootResult data={data!} hasAssign={Boolean(assignmentId)} />
    </ScrollView>
  );
};

export default ReportDetailScreen;
