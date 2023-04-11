import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectProfile,
  changeOrderByRecord,
  changeOrderByTime,
} from '../../app/loginSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const [byRecord, setByRecord] = useState('create');
  const [byTime, setByTime] = useState('oldest');

  useEffect(() => {
    const order = profile.orderBy;
    setByRecord(order.record);
    setByTime(order.time);
  }, [profile.orderBy.time, profile.orderBy.record]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'lightcyan',
        gap: '20px',
      }}
    >
      <h1>I'm Header</h1>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch(changeOrderByRecord())}
      >
        {byRecord === 'create' ? '創建時間' : '編輯時間'}
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch(changeOrderByTime())}
      >
        {byTime === 'newest' ? '新到舊' : '舊到新'}
      </div>
    </div>
  );
};

export default Header;
