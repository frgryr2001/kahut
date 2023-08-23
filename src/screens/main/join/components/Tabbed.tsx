import ButtonTab from './ButtonTab';
import PinCode from './PinCode';
import React, {useState} from 'react';
import QrCode from './QrCode';
import {getAssignment} from '../../../../services/play/play.service';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../../navigation/AppNavigationContainer';
import Spinner from 'react-native-loading-spinner-overlay';
import {Alert} from 'react-native';

export default function Tabbed() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (tab: number) => {
    setActiveTab(tab);
  };

  const verifyPinPlay = async (pinCode: number) => {
    try {
      setLoading(true);
      const res = await getAssignment(undefined, pinCode);
      if (res) {
        setLoading(false);
        const kahoot = res;
        navigation.navigate('PlayScreen', {
          kahoot,
          assignmentId: kahoot.id, // kahoot.id as assignmentId
        });
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.response.data.message);
    }
  };

  return (
    <>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      {activeTab === 0 && <PinCode verifyPinPlay={verifyPinPlay} />}
      {activeTab === 1 && <QrCode verifyPinPlay={verifyPinPlay} />}

      <ButtonTab activeTab={activeTab} handleChangeTab={handleChangeTab} />
    </>
  );
}
