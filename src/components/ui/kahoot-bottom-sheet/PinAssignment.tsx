import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {formattedDate} from '../../../helpers/formattedDate';
import {IAssignmentData} from '../../../types/play';
import {Button} from '../Button';
import {useTheme} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
export default function PinAssignment({
  assignment,
  closeModalChooseGameMode,
}: {
  assignment: IAssignmentData;
  closeModalChooseGameMode: () => void;
}) {
  const {colors} = useTheme();
  const [copiedText, setCopiedText] = React.useState('');
  const copyToClipboard = () => {
    Clipboard.setString(assignment.pin);

    Clipboard.getString().then(text => {
      setCopiedText(text);
    });
  };

  useEffect(() => {
    if (copiedText) {
      setTimeout(() => {
        setCopiedText('');
      }, 2000);
    }
  }, [copiedText]);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        onPress={copyToClipboard}
        style={[
          styles.boxCopyText,
          {
            backgroundColor: colors.card,
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            right: -10,
            top: -10,
          }}>
          {copiedText ? <Text style={{color: colors.text}}>Copied</Text> : null}
        </View>

        <Text
          style={[
            styles.copyText,
            {
              color: colors.text,
            },
          ]}>
          {assignment.pin}
        </Text>
      </Pressable>
      <Text>Deadline</Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: colors.text,
          marginTop: 10,
        }}>
        {formattedDate(assignment.expiredAt)}
      </Text>
      <Button
        title="Done"
        as="text"
        style={{
          marginTop: 30,
        }}
        onPress={closeModalChooseGameMode}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  boxCopyText: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  copyText: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});
