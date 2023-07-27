import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux/slices/questionSlice/selector';

export const useThemeQuestion = () => {
  const themeQuestion = useSelector(selectTheme);

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
