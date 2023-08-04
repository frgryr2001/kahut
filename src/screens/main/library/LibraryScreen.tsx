import {StatusBar, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './LibraryScreen.style';
import LIBRARY_SECTIONS from '../../../constants/librarySections';

const LibraryScreen = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        {LIBRARY_SECTIONS.map(section => (
          <View key={section.id} style={styles.sectionContainer}>
            {section.items.map(item => (
              <Pressable
                key={item.id}
                onPress={() => item.onPress(navigation)}
                style={styles.itemContainer}>
                <Icon name={item.icon} size={24} color={colors.text} />
                <Text style={[{color: colors.text}, styles.itemTitle]}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default LibraryScreen;
