import {View, Text, Dimensions, Image} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import styles from './HomeBannerSlider.style';

const data: Array<{title: string; image: any}> = [
  {
    title: 'Back-to-school | Get ready with these top resources from Kahoot!',
    image: require('../../../../../assets/images/banners/b-1.png'),
  },
  {
    title:
      'Top 10 updates from Kahoot! to make this school year awesome | Kahoot!',
    image: require('../../../../../assets/images/banners/b-2.png'),
  },
  {
    title: 'What is Kahoot.it | how do I join a Kahoot game 2022',
    image: require('../../../../../assets/images/banners/b-3.png'),
  },
  {
    title: 'Alternative to Kahoot! | Best Choice in 2023',
    image: require('../../../../../assets/images/banners/b-4.png'),
  },
  {
    title:
      "Kahoot! Quiz games | Spark your child's natural curiosity for learning",
    image: require('../../../../../assets/images/banners/b-5.png'),
  },
];

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Dimensions.get('window').width - 32;

const HomeBannerSlider = () => {
  const {colors} = useTheme();
  const isCarousel = React.useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={data}
        firstItem={data.length}
        initialScrollIndex={data.length}
        horizontal={false}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.8}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        autoplay={true}
        loop={true}
        loopClonesPerSide={data.length}
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

export default memo(HomeBannerSlider);
