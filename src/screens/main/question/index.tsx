import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {styles as globalStyles} from '../../../themes/appTheme';
import {
  ButtonCustom,
  Header,
  ImageCover,
  InputTitle,
  ListQuestion,
  ListTypeQuestion,
  Setting,
  ThemeSetting,
  ThemeBackground,
} from './components';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/Navigation';
import {ListTheme} from './components/ListTheme';
import {useThemeQuestion} from '../../../hooks/getTheme';
import {Question} from '../../../types/question';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'QuestionScreen'> {}

const questions: Question[] = [];

export const QuestionScreen = ({navigation}: Props) => {
  const [isClickShowTheme, setIsClickShowTheme] = useState<boolean>(false);
  const {themeQuestion, getBackground} = useThemeQuestion();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsClickShowTheme(false);
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <BottomSheetModalProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: '#F5F5F5',
            }}>
            {/* <ThemeBackground /> */}
            <ThemeBackground
              themeQuestion={themeQuestion}
              getBackground={getBackground}
            />
            {/* Header  */}
            <Header completed />
            <ScrollView automaticallyAdjustKeyboardInsets>
              <View style={[globalStyles.globalPadding10, styles.container]}>
                <ImageCover as="image" content="Tap me to add cover image" />
                <View style={styles.containerTitle}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: themeQuestion === 'Standard' ? 'black' : 'white',
                      },
                    ]}>
                    Title
                  </Text>
                  <View style={styles.flexRow}>
                    <InputTitle placeholder="Enter a title" flex />
                    <Setting navigation={navigation} />
                  </View>
                  {/* Theme Setting */}
                  <Text
                    style={[
                      styles.title,
                      {
                        color: themeQuestion === 'Standard' ? 'black' : 'white',
                      },
                    ]}>
                    Theme
                  </Text>
                  <ThemeSetting
                    onPress={() => {
                      setIsClickShowTheme(true);
                      handlePresentModalPress();
                    }}
                    getBackground={getBackground}
                  />
                  <Text
                    style={[
                      styles.title,
                      {
                        color: themeQuestion === 'Standard' ? 'black' : 'white',
                      },
                    ]}>
                    Question (1)
                  </Text>
                  {/* List Question */}
                  <ListQuestion questions={questions} />
                  <View
                    style={{
                      height: 90,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
            <ButtonCustom
              onPress={handlePresentModalPress}
              as="button"
              label={`Add ${'\n'} question`}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={isClickShowTheme ? 1 : 0}
              enablePanDownToClose={true}
              snapPoints={snapPoints}
              style={{
                backgroundColor: 'white',
              }}
              onChange={handleSheetChanges}
              backdropComponent={renderBackdrop}>
              {!isClickShowTheme && (
                <View style={styles.contentContainer}>
                  <Text style={styles.titleQuestion}>Add Question</Text>
                  <Text style={styles.textKnowledge}>Test Knowledge</Text>
                  <ListTypeQuestion
                    navigation={navigation}
                    handleCloseModalPress={handleCloseModalPress}
                  />
                </View>
              )}
              {isClickShowTheme && (
                <ListTheme onCloseBottomModal={handleCloseModalPress} />
              )}
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
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
  titleQuestion: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  textKnowledge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#7C7C7C',
    marginVertical: 10,
  },
});
