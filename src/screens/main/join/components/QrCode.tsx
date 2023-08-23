import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function QrCode({
  verifyPinPlay,
}: {
  verifyPinPlay: (pinCode: number) => void;
}) {
  const onSuccess = async (e: any) => {
    const pinCode = +e.data;
    verifyPinPlay(pinCode);
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.centerText}>
        <Text
          style={{
            fontSize: 32,
            color: '#fff',
            fontFamily: 'Poppins-Medium',
          }}>
          Join Game
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontFamily: 'Poppins-Regular',
          }}>
          Scan QR Code
        </Text>
      </View>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        markerStyle={{
          borderColor: '#fff',
          borderRadius: 5,
        }}
        flashMode={RNCamera.Constants.FlashMode.auto}
        containerStyle={{
          justifyContent: 'center',
        }}
        cameraStyle={{
          width: '100%',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    fontSize: 20,
  },
});
