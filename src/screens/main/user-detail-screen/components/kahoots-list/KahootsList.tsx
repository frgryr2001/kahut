import React from 'react';
import {View} from 'react-native';

import {
  KahootListItemSkeleton,
  EmptyMessage,
  KahootListItem,
} from '../../../../../components/ui/';
import {KahootSummary} from '../../../../../types/kahoot.type';

interface Props {
  data?: KahootSummary[];
}

const KahootsList = ({data}: Props) => {
  const handleTransferIdEdit = () => {};
  console.log(data && data.length === 0);

  return (
    <View
      style={{
        gap: 16,
        padding: 16,
      }}>
      {!data && (
        <>
          <KahootListItemSkeleton />
          <KahootListItemSkeleton />
          <KahootListItemSkeleton />
        </>
      )}
      {data && data.length === 0 && (
        <EmptyMessage messages={['Looks empty here...']} />
      )}
      {data &&
        data.length > 0 &&
        data.map(kahoot => (
          <KahootListItem
            key={kahoot.id}
            kahoot={kahoot}
            handleTransferIdEdit={handleTransferIdEdit}
          />
        ))}
    </View>
  );
};

export default KahootsList;
