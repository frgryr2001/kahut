import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '../../../../components/ui';
export default function ButtonTab({
  activeTab,
  handleChangeTab,
}: {
  activeTab: number;
  handleChangeTab: (tab: number) => void;
}) {
  return (
    <View style={styles.containerTab}>
      <Button
        title="Pin code"
        onPress={() => handleChangeTab(0)}
        size="medium"
        width={'50%'}
        style={{
          marginTop: 0,
          backgroundColor: activeTab === 0 ? '#673AB7' : '#ffffff',
          borderRadius: 0,
          elevation: 0,
        }}
        isActive={activeTab === 0}
        icon={{
          name: 'apps-outline',
          size: 20,
          color: activeTab === 0 ? '#ffffff' : 'black',
        }}
      />
      <Button
        title="QR code"
        onPress={() => handleChangeTab(1)}
        size="medium"
        width={'50%'}
        style={{
          marginTop: 0,
          backgroundColor: activeTab === 1 ? '#673AB7' : '#ffffff',
          borderRadius: 0,
          elevation: 0,
        }}
        icon={{
          name: 'qr-code-outline',
          size: 20,
          color: activeTab === 1 ? '#ffffff' : 'black',
        }}
        isActive={activeTab === 1}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#673AB7',
  },
  titlePin: {
    fontSize: 32,
  },
  subTitlePin: {
    color: '#D1C4E9',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
});
