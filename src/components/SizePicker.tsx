import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectProfile, changeDisplayFontSize } from '../app/loginSlice';

const SizePicker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div
        style={{ cursor: 'pointer', border: '1px solid pink', padding: '5px' }}
        onClick={() => dispatch(changeDisplayFontSize('small'))}
      >
        small
      </div>
      <div
        style={{ cursor: 'pointer', border: '1px solid pink', padding: '5px' }}
        onClick={() => dispatch(changeDisplayFontSize('medium'))}
      >
        medium
      </div>
      <div
        style={{ cursor: 'pointer', border: '1px solid pink', padding: '5px' }}
        onClick={() => dispatch(changeDisplayFontSize('large'))}
      >
        large
      </div>
    </div>
  );
};

export default SizePicker;
