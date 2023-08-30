import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {getIcon} from '../../../helpers/getIcon';
import {Button} from '../Button';
import PopupMenu from '../popup-menu/PopupMenu';

const width = Dimensions.get('window').width;
interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function BottomSheet({children}: Props) {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });
}

function Container({children}: Props) {
  return <View style={[styles.container]}>{children}</View>;
}
function ImageCoverKahoot({image}: {image: string}) {
  const {colors} = useTheme();
  return (
    <>
      {image ? (
        <Image
          source={{uri: image}}
          style={{
            width: '100%',
            height: 220,
            objectFit: 'contain',
            backgroundColor: colors.background,
          }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: 220,
            backgroundColor: colors.background,
          }}
        />
      )}
    </>
  );
}
function Title({title}: {title?: string}) {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.titleContainer,
        {
          borderBottomColor: colors.background,
          borderBottomWidth: 1,
        },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontFamily: 'Poppins-Bold',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}
function BoxVisibleQuantityItem({
  nameIcon,
  color,
  count = 0,
}: {
  nameIcon: string;
  color: string;
  count?: number;
}) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      }}>
      {getIcon(nameIcon, 25, color)}
      <Text
        style={{
          color: colors.text,
        }}>
        {count}
      </Text>
    </View>
  );
}

function BoxVisibleQuantity({element}: {element: JSX.Element | JSX.Element[]}) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: colors.background,
        paddingBottom: 10,
      }}>
      {element}
    </View>
  );
}

function BoxUserAction({
  visibleEdit = false,
  isFavorite = false,
  username,
  onPressEdit,
  onPressDelete,
  handleFavorite,
  handleNavigateToUserDetail,
  isMyKahoot = false,
  openModalShare,
}: {
  visibleEdit?: boolean;
  username?: string;
  isFavorite?: boolean;
  onPressEdit?: () => void;
  onPressDelete?: () => void;
  handleFavorite?: () => void;
  handleNavigateToUserDetail?: () => void;
  isMyKahoot?: boolean;
  openModalShare?: () => void;
}) {
  const {colors} = useTheme();

  // const formattedName = () => {
  //   const name = (username as string) ?? '';
  //   const nameArr = name.split('-');

  //   nameArr.pop();
  //   return nameArr.join(' ');
  // };

  const itemPopup = useMemo(() => {
    return [
      {
        title: 'Share',
        icon: 'share-social-outline',
        onPress: () => openModalShare && openModalShare(),
      },
      {
        title: 'Delete',
        icon: 'trash-outline',
        onPress: () => onPressDelete && onPressDelete(),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.boxUserAction}>
      {/* user name */}
      <Pressable
        style={[
          styles.nameUser,
          {
            backgroundColor: colors.background,
          },
        ]}
        onPress={() => handleNavigateToUserDetail!()}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: colors.text,
            fontFamily: 'Poppins-Regular',
            maxWidth: 150,
          }}>
          {/* {formattedName()} */}
          {username}
        </Text>
      </Pressable>

      <View style={styles.btnActionContainer}>
        {/* user action */}
        <ButtonActions
          nameIcon={isFavorite ? 'star' : 'star-outline'}
          onPress={() => handleFavorite!()}
          color={isFavorite ? '#FFC107' : '#000'}
        />
        {visibleEdit && (
          <ButtonActions
            nameIcon="pencil-outline"
            onPress={() => onPressEdit!()}
          />
        )}

        <PopupMenu arrInitPopupMenu={itemPopup} isMyKahoot={isMyKahoot} />
      </View>
    </View>
  );
}
function ButtonActions({
  nameIcon,
  onPress,
  color = '#000',
}: {
  nameIcon: string;
  onPress: () => void;
  color?: string;
}) {
  const {colors} = useTheme();

  return (
    <Pressable
      style={[
        styles.btnAction,
        {
          backgroundColor: colors.background,
        },
      ]}
      onPress={onPress}>
      {getIcon(nameIcon, 25, color)}
    </Pressable>
  );
}
function ButtonPlay({onPress}: {onPress: () => void}) {
  return (
    <Button
      title="Play"
      onPress={onPress}
      size="medium"
      isActive
      style={{
        shadowColor: '#00000040',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 40,
  },
  title: {
    fontSize: 20,
  },
  titleContainer: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  nameUser: {
    padding: 10,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  btnActionContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    width: 150,
  },
  btnAction: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  boxUserAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
});
BottomSheet.ImageCoverKahoot = ImageCoverKahoot;
BottomSheet.Container = Container;
BottomSheet.Title = Title;
BottomSheet.BoxVisibleQuantity = BoxVisibleQuantity;
BottomSheet.BoxVisibleQuantityItem = BoxVisibleQuantityItem;
BottomSheet.BoxUserAction = BoxUserAction;
BottomSheet.ButtonPlay = ButtonPlay;
