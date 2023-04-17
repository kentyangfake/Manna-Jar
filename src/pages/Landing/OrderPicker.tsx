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
    <div className="flex border justify-center text-stone-100 bg-stone-400">
      <div
        className="border-r p-4"
        onClick={() => dispatch(changeOrderByRecord())}
      >
        {profile.orderBy.record === 'create' ? '創建時間' : '更新時間'}
      </div>
      <div className="p-4" onClick={() => dispatch(changeOrderByTime())}>
        {profile.orderBy.time === 'newest' ? '新到舊' : '舊到新'}
      </div>
    </div>
  );
};

export default OrderPicker;
