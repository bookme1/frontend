import React from 'react';

import { Icon } from '../common/Icon';

const Webdata = ({
  onlineQuantity,
  newUsersQuantity,
  users,
}: {
  onlineQuantity: number;
  newUsersQuantity: number;
  users: number;
}) => {
  return (
    <div className="pl-40">
      <ul className="flex gap-10">
        <li className="flex-col gap-1 shadow-2xl p-3 rounded-lg">
          <div
            className="flex gap-2 items-center text-green-900"
            title="за поточний день"
          >
            <Icon name="online" />
            <p>Онлайн</p>
          </div>
          <p className="text-center text-green-400 font-bold">
            {onlineQuantity}
          </p>
        </li>
        <li className="flex-col gap-1 shadow-2xl p-3 rounded-lg">
          <div
            className="flex gap-2 items-center text-green-900"
            title="за поточний місяць"
          >
            <Icon name="newusers" />
            <p>Нові користувачі</p>
          </div>
          <p className="text-center text-green-400 font-bold">
            +{newUsersQuantity}
          </p>
        </li>
        <li className="flex-col gap-2 shadow-2xl p-3 rounded-lg">
          <div
            className="flex gap-2 items-center text-green-900"
            title="загальна кількість"
          >
            <Icon name="group" />
            <p>Користувачі</p>
          </div>
          <p className="text-center text-green-900 font-bold">{users}</p>
        </li>
        <li className="flex-col gap-2 shadow-2xl p-3 rounded-lg">
          <div className="flex gap-2 text-green-900">
            <Icon name="traffic" />
            <p>Трафік</p>
          </div>
          <p className="text-center text-green-900 font-bold">12,000</p>
        </li>
      </ul>
    </div>
  );
};

export default Webdata;
