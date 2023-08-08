import {View, Text, Dimensions, Image} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import styles from './BannerSlider.style';
import BANNERS from '../../../constants/banner';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Dimensions.get('window').width - 32;

const BannerSlider = () => {
  const {colors} = useTheme();
  const isCarousel = React.useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={BANNERS}
        firstItem={BANNERS.length}
        initialScrollIndex={BANNERS.length}
        horizontal={false}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.8}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        autoplay={true}
        loop={true}
        loopClonesPerSide={BANNERS.length}
        renderItem={({item, index}) => (
          <View
            style={{
              paddingVertical: 16,
            }}>
            <View style={styles.itemContainer} key={index}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[{color: colors.text}, styles.itemTitle]}>
                {item.title}
              </Text>
              <Image source={item.image} style={styles.itemImage} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default memo(BannerSlider);
