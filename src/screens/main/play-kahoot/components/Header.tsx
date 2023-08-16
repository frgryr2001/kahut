import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Button, ModalCustom} from '../../../../components/ui';

interface Props {
  startIndex: number;
  numberQuestion: number;
  typeQuestion: string;
  onPressQuit: () => void;
}

export default function Header({
  startIndex,
  numberQuestion,
  typeQuestion,
  onPressQuit,
}: Props) {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.header}>
      {/* Quantity Question */}
      <Text
        style={[
          styles.itemHeader,
          {
            fontFamily: 'Poppins-Bold',
            color: colors.text,
          },
        ]}>
        {startIndex}/{numberQuestion}
      </Text>
      {/* Type */}
      <Text
        style={[
          styles.itemHeader,
          {
            fontFamily: 'Poppins-Bold',
            color: colors.text,
          },
        ]}>
        {typeQuestion.toLocaleUpperCase()}
      </Text>

      {/* Quit */}
      <Pressable onPress={() => setModalVisible(true)}>
        <Text
          style={[
            styles.itemHeader,
            {
              fontFamily: 'Poppins-Bold',
              color: colors.text,
            },
          ]}>
          Quit
        </Text>
      </Pressable>

      {/* Modal quit */}
      <ModalCustom modalVisible={modalVisible} title="Quit">
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: colors.text,
            textAlign: 'center',
            fontSize: 16,
          }}>
          Are you sure you want to quit?
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
          <Button
            title="Cancel"
            onPress={() => setModalVisible(false)}
            color={colors.background}
            size="medium"
          />
          <Button
            title="Ok"
            onPress={onPressQuit}
            color={colors.primary}
            size="medium"
            isActive
          />
        </View>
      </ModalCustom>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    height: 55,
  },
  itemHeader: {
    fontSize: 16,
  },
});
