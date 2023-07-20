import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectThemeCreateQuestion} from '../redux/slices/questionSlice/selector';

export const useThemeQuestion = () => {
  const themeQuestion = useSelector(selectThemeCreateQuestion);

  const getBackground = useCallback(() => {
    switch (themeQuestion) {
      case 'Spring':
        return require('../assets/images/themes/springTheme.png');
      case 'Summer':
        return require('../assets/images/themes/summerTheme.png');
      default:
        return null;
    }
  }, [themeQuestion]);
  return {
    getBackground,
    themeQuestion,
  };
};
