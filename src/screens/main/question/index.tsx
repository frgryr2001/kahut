import React, {useCallback, useMemo, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {styles as globalStyles} from '../../../themes/appTheme';
import {
  AddQuestion,
  Header,
  ImageCover,
  InputTitle,
  ListQuestion,
  ListTypeQuestion,
  Setting,
  ThemeSetting,
} from './components';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

export const QuestionScreen = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  //   const handleSheetChanges = useCallback((index: number) => {
  //     console.log('handleSheetChanges', index);
  //   }, []);

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
          {/* Header  */}
          <Header />
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
          <AddQuestion
            onPress={handlePresentModalPress}
            as="button"
            label={`Add ${'\n'} question`}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            style={{
              backgroundColor: 'white',
            }}
            //   onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
              <Text style={styles.titleQuestion}>Add Question</Text>
              <Text style={styles.textKnowledge}>Test Knowledge</Text>
              <ListTypeQuestion />
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
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
