import {Image, View} from 'react-native';
import React from 'react';
interface Props {
  media: string;
}
export default function QuestionImage({media}: Props) {
  return (
    <>
      {media ? (
        <Image
          source={{
            uri: media,
          }}
          resizeMode="contain"
          style={{
            width: '100%',
            height: 200,
            marginTop: 20,
          }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: 200,
            marginTop: 20,
          }}
        />
      )}
    </>
  );
}
