import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Button, ModalCustom} from '..';
import GameModeCard from './GameModeCard';
import SettingAssignment from './SettingAssignment';
import {formattedDate} from '../../../helpers/formattedDate';
import {useTheme} from '@react-navigation/native';
import {IAssignmentData} from '../../../types/play';
import {createAssignment} from '../../../services/play/play.service';
import PinAssignment from './PinAssignment';
const height = Dimensions.get('window').height;
export default function ModalGameMode({
  modalVisible,
  closeModalChooseGameMode,
  handleStartGame,
  kahootId,
}: {
  modalVisible: boolean;
  closeModalChooseGameMode: () => void;
  handleStartGame: () => void;
  kahootId: number;
}) {
  const {colors} = useTheme();
  const [isAssigment, setIsAssigment] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [assignment, setAssignment] = useState<IAssignmentData>();
  const handleChangeDate = (dateValue: Date) => {
    setDate(dateValue);
  };

  const handleCreateAssignment = async () => {
    const expiredAt = date.getTime();
    if (expiredAt < Date.now()) {
      Alert.alert('Invalid date', 'Please choose a date in the future');
      return;
    }
    setIsLoading(true);

    const res = await createAssignment({
      kahootId,
      expiredAt: expiredAt,
    });
    if (res.code === 200) {
      setIsLoading(false);
      setAssignment(res.data);
      setIsAssigment(false);
    }
  };
  return (
    <ModalCustom
      modalVisible={modalVisible}
      title={
        isAssigment
          ? 'Assign'
          : assignment
          ? 'Assignment created'
          : 'Choose Game Mode'
      }
      onCloseModal={() => {
        if (isAssigment) {
          setIsAssigment(false);
        } else {
          closeModalChooseGameMode();
        }
      }}>
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 4,
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {/*  */}
          {assignment && (
            <PinAssignment
              assignment={assignment}
              closeModalChooseGameMode={closeModalChooseGameMode}
            />
          )}
          <View>
            {isAssigment && !assignment && (
              <View>
                <View style={styles.containerDate}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                      }}>
                      Deadline on :{' '}
                    </Text>
                    <Text
                      style={[
                        styles.dateText,
                        {
                          color: colors.text,
                        },
                      ]}>
                      {formattedDate(date.getTime())}
                    </Text>
                  </View>
                  <SettingAssignment
                    handleChangeDate={handleChangeDate}
                    date={date}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setIsAssigment(false);
                    }}
                    size="small"
                    width={'47%'}
                    color={colors.background}
                  />
                  <Button
                    title="Create"
                    onPress={() => handleCreateAssignment()}
                    size="small"
                    isActive
                    width={'47%'}
                  />
                </View>
              </View>
            )}
            {!isAssigment && !assignment && (
              <View style={styles.boxGameMode}>
                <GameModeCard
                  title="Assignment"
                  subTitle="Send this kahoot as homework"
                  onPress={() => setIsAssigment(true)}
                />
                <GameModeCard
                  title="Practice"
                  subTitle="Play on your own"
                  onPress={() => handleStartGame()}
                />
              </View>
            )}
          </View>
        </>
      )}
    </ModalCustom>
  );
}
const styles = StyleSheet.create({
  boxGameMode: {
    gap: 5,
    paddingBottom: 20,
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
