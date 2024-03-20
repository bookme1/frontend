"use client";
import React from "react";
import { Icon } from "../common/Icon";

const Webstatistics = () => {
  return (
    <>
      <div className="w-min">
        <ul className="flex-col ml-20  text-gray-500">
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900 ">
            {" "}
            <Icon name="mainhome" />{" "}
            <p className="hover:text-green-900">Головна</p>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900">
            {" "}
            <Icon name="group" />
            <p className="hover:text-green-900">Користувачі</p>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900">
            {" "}
            <Icon name="menubook" />
            <p className="hover:text-green-900">Книги</p>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900">
            {" "}
            <Icon name="album" />
            <p className="hover:text-green-900">Набори</p>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900">
            {" "}
            <Icon name="sales" />
            <p className="hover:text-green-900">Продажі</p>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900">
            {" "}
            <Icon name="localization" />
            <p className="hover:text-green-900">Локалізація</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Webstatistics;
