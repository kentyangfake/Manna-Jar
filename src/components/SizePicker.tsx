import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProfile, changeDisplayFontSize } from '../app/loginSlice';

const SizePicker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div
        style={profile.fontSize === 'small' ? { backgroundColor: 'pink' } : {}}
        onClick={() => dispatch(changeDisplayFontSize('small'))}
      >
        small
      </div>
      <div
        style={profile.fontSize === 'medium' ? { backgroundColor: 'pink' } : {}}
        onClick={() => dispatch(changeDisplayFontSize('medium'))}
      >
        medium
      </div>
      <div
        style={profile.fontSize === 'large' ? { backgroundColor: 'pink' } : {}}
        onClick={() => dispatch(changeDisplayFontSize('large'))}
      >
        large
      </div>
    </div>
  );
};

export default SizePicker;
