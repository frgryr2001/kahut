import {View, Pressable} from 'react-native';
import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Tabbed({children}: Props) {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });
}

function Tab({
  children,
  active,
  handleSetActiveTab,
}: {
  children: JSX.Element;
  active?: boolean;
  handleSetActiveTab?: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        if (handleSetActiveTab) {
          handleSetActiveTab();
        }
      }}
      style={{
        padding: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: active ? '#ffffff' : '#20065c',
        borderRadius: 3,
      }}>
      {React.cloneElement(children, {
        style: {
          color: active ? '#20065c' : '#ffffff',
          fontFamily: 'Poppins-Bold',
        },
      })}
    </Pressable>
  );
}

function TabActionContainer({children, hideTab}: Props & {hideTab?: boolean}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 10,
      }}>
      {hideTab ? <></> : children}
    </View>
  );
}

function TabContent({children}: Props) {
  return <View>{children}</View>;
}

Tabbed.Tab = Tab;
Tabbed.ActionContainer = TabActionContainer;
Tabbed.TabContent = TabContent;
