import {View, Text, TouchableHighlight} from 'react-native';
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import styles from './Sections.style';

interface Props {
  handleSignOut: () => void;
}

const Sections = ({handleSignOut}: Props) => {
  const {colors} = useTheme();

  const SECTIONS = useMemo(
    () => [
      {
        id: 1,
        name: 'Profile',
        items: [
          {
            id: 1,
            name: 'Sign out',
            onClick: handleSignOut,
            icon: 'logout-variant',
          },
        ],
      },
      {
        id: 2,
        name: 'Music',
        items: [
          {
            id: 1,
            name: 'Music',
            icon: null,
            onClick: null,
          },
          {
            id: 2,
            name: 'Sound Effects',
            icon: null,
            onClick: null,
          },
        ],
      },
      {
        id: 3,
        name: 'Notifications',
        items: [
          {
            id: 1,
            name: 'Notifications',
            icon: null,
            onClick: null,
          },
        ],
      },
      {
        id: 4,
        name: 'Social',
        items: [
          {
            id: 1,
            name: 'Spread the World',
            icon: null,
            onClick: null,
          },
        ],
      },
      {
        id: 5,
        name: 'Language',
        items: [
          {
            id: 1,
            name: 'English (US)',
            icon: null,
            onClick: null,
          },
        ],
      },
      {
        id: 6,
        name: 'General',
        items: [
          {
            id: 1,
            name: 'Dark mode',
            icon: null,
            onClick: null,
          },
          {
            id: 2,
            name: 'Version 1.0.0',
            icon: null,
            onClick: null,
          },
          {
            id: 3,
            name: 'Account settings',
            icon: null,
            onClick: null,
          },
          {
            id: 4,
            name: 'Term and Conditions',
            icon: null,
            onClick: null,
          },
          {
            id: 5,
            name: 'Privacy Policy',
            icon: null,
            onClick: null,
          },
          {
            id: 6,
            name: 'Acknowledgements',
            icon: null,
            onClick: null,
          },
          {
            id: 7,
            name: 'FAQ',
            icon: null,
            onClick: null,
          },
        ],
      },
    ],
    [handleSignOut],
  );

  return (
    <View style={{gap: 16}}>
      {SECTIONS.map(section => (
        <View key={section.id} style={{gap: 8}}>
          <Text
            style={{
              color: colors.text,
              ...styles.sectionName,
            }}>
            {section.name}
          </Text>
          <View style={styles.sectionItemsContainer}>
            {section.items.map(sectionItem => (
              <TouchableHighlight
                key={sectionItem.id}
                onPress={sectionItem.onClick ?? (() => {})}
                underlayColor="#eee">
                <View style={styles.sectionItemContainer}>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                    }}>
                    {sectionItem.name}
                  </Text>

                  {sectionItem.icon && (
                    <Icon
                      name={sectionItem.icon}
                      size={24}
                      color={colors.text}
                    />
                  )}
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Sections;
