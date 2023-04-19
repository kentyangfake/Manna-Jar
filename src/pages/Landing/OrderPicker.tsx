import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectProfile,
  changeOrderByRecord,
  changeOrderByTime,
} from '../../app/loginSlice';
import * as styles from '../../utils/styles';

const OrderPicker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <div className={`flex bg-stone-500 border border-stone-500`}>
      <div
        className={`${styles.themeButton} border-r w-44 ${
          profile.orderBy.record === 'create'
            ? 'rounded-tl-full'
            : 'rounded-bl-full'
        }`}
        onClick={() => dispatch(changeOrderByRecord())}
      >
        {profile.orderBy.record === 'create' ? '創建時間' : '更新時間'}
      </div>
      <div
        className={`${styles.themeButton} border-r w-44 ${
          profile.orderBy.time === 'newest'
            ? 'rounded-br-full'
            : 'rounded-tr-full'
        }`}
        onClick={() => dispatch(changeOrderByTime())}
      >
        {profile.orderBy.time === 'newest' ? '新到舊' : '舊到新'}
      </div>
      <div className="grow rounded-bl-full bg-stone-300 p-4"></div>
    </div>
  );
};

export default OrderPicker;
