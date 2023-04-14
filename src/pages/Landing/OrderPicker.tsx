import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectProfile,
  changeOrderByRecord,
  changeOrderByTime,
} from '../../app/loginSlice';

const OrderPicker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'lightcyan',
        gap: '20px',
      }}
    >
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch(changeOrderByRecord())}
      >
        {profile.orderBy.record === 'create' ? '創建時間' : '更新時間'}
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch(changeOrderByTime())}
      >
        {profile.orderBy.time === 'newest' ? '新到舊' : '舊到新'}
      </div>
    </div>
  );
};

export default OrderPicker;
