import {StatusBar, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SECTIONS = [
  {
    id: 1,
    items: [
      {
        id: 1,
        title: 'Kahoots',
        icon: 'account-outline',
        onPress: () => {},
      },
      {
        id: 2,
        title: 'Reports',
        icon: 'finance',
        onPress: () => {},
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: 1,
        title: 'Study groups',
        icon: 'google-classroom',
        onPress: () => {},
      },
      {
        id: 2,
        title: 'Courses',
        icon: 'certificate-outline',
        onPress: () => {},
      },
      {
        id: 3,
        title: 'Groups',
        icon: 'account-group-outline',
        onPress: () => {},
      },
      {
        id: 4,
        title: 'Study',
        icon: 'school-outline',
        onPress: () => {},
      },
    ],
  },
];

const LibraryScreen = () => {
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
      <View style={{padding: 16, gap: 16}}>
        {SECTIONS.map(section => (
          <View
            key={section.id}
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              shadowColor: '#00000040',
              elevation: 2,
              backgroundColor: '#ddd',
              gap: 1,
            }}>
            {section.items.map(item => (
              <Pressable
                key={item.id}
                onPress={() => {}}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  backgroundColor: '#fff',
                }}>
                <Icon name={item.icon} size={24} color={colors.text} />
                <Text
                  style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>
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
