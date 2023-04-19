import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProfile, changeDisplayFontSize } from '../app/loginSlice';
import * as styles from '../utils/styles';

const SizePicker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  return (
    <div className="flex h-8 border-y bg-stone-500 border-stone-500">
      <div
        className={`w-32 border-r text-sm font-serif font-black rounded-e-full ${
          profile.fontSize === 'small'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('small'))}
      >
        A
      </div>
      <div
        className={`w-32 border-x text-lg font-serif font-bold rounded-full ${
          profile.fontSize === 'medium'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('medium'))}
      >
        A
      </div>
      <div
        className={`w-32 border-x text-2xl font-serif font-bold rounded-full ${
          profile.fontSize === 'large'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('large'))}
      >
        A
      </div>
      <div className={`${styles.theme} grow border-l rounded-s-full`}></div>
    </div>
  );
};

export default SizePicker;
