import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {styles as globalStyles} from '../../../themes/appTheme';
import {
  AddQuestion,
  ImageCover,
  InputTitle,
  ListQuestion,
  Setting,
  ThemeSetting,
} from './components';

export const QuestionScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <View style={[globalStyles.globalPadding10, styles.container]}>
          <ImageCover />
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Title</Text>
            <View style={styles.flexRow}>
              <InputTitle placeholder="Enter a title" />
              <Setting />
            </View>
            {/* Theme Setting */}
            <Text style={styles.title}>Theme</Text>
            <ThemeSetting />
            <Text style={styles.title}>Question (1)</Text>
            {/* List Question */}
            <ListQuestion />
            <View
              style={{
                height: 90,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <AddQuestion />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 10,
  },
  containerTitle: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  themeSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
    borderRadius: 3,
    gap: 10,
    marginTop: 10,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imageTheme: {
    width: '100%',
    height: 50,
    flex: 0.2,
    backgroundColor: 'red',
  },
  titleTheme: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});
