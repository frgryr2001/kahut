import {useCallback} from 'react';

export const useThemeQuestion = (themeQuestion: any) => {
  const getBackground = useCallback(() => {
    switch (themeQuestion) {
      default:
        return null;
    }
  }, [themeQuestion]);
  return {
    getBackground,
    themeQuestion,
  };
};
