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
    <div className="flex text-stone-600 bg-stone-500 border border-stone-500">
      <div
        className={`flex justify-center items-center cursor-pointer border-r border-stone-500 bg-stone-300 hover:bg-stone-200 w-44 ${
          profile.orderBy.record === 'create'
            ? 'rounded-tl-full'
            : 'rounded-bl-full'
        }`}
        onClick={() => dispatch(changeOrderByRecord())}
      >
        {profile.orderBy.record === 'create' ? '創建時間' : '更新時間'}
      </div>
      <div
        className={`flex justify-center items-center cursor-pointer border-r border-stone-500 bg-stone-300 hover:bg-stone-200 w-44 ${
          profile.orderBy.time === 'newest'
            ? 'rounded-tr-full'
            : 'rounded-br-full'
        }`}
        onClick={() => dispatch(changeOrderByTime())}
      >
        {profile.orderBy.time === 'newest' ? '新到舊' : '舊到新'}
      </div>
      <div className="grow bg-stone-300 p-4"></div>
    </div>
  );
};

export default OrderPicker;
