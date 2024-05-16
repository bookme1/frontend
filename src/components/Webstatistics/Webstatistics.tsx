"use client";
import React from "react";
import { Icon } from "../common/Icon";
import Gear from "@/assets/account/gear.png";
import Image from "next/image";

const Webstatistics = () => {
  return (
    <>
      <div className="w-max">
        <ul className="flex-col ml-20  text-gray-500 ">
          <li className="flex gap-3 mb-6 cursor-pointer  hover:text-green-900  ">
            <button className="flex gap-2 justify-center items-center ">
              <Icon name="mainhome" />{" "}
              <p className="hover:text-green-900 ">Головна</p>
            </button>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
            <button className="flex gap-2 justify-center items-center ">
              <Icon name="group" />
              <p className="hover:text-green-900">Користувачі</p>
            </button>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
            <button className="flex gap-2 justify-center items-center ">
              <Icon name="menubook" />
              <p className="hover:text-green-900">Книги</p>
            </button>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
            <button className="flex gap-2 justify-center items-center ">
              <Icon name="album" />
              <p className="hover:text-green-900">Набори</p>
            </button>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
            <button className="flex gap-2 justify-center items-center ">
              <Icon name="sales" />
              <p className="hover:text-green-900 ">Продажі</p>
            </button>
          </li>
          <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900 ">
            <button className="flex gap-2 justify-center items-center ">
              <Icon name="localization" />
              <p className="hover:text-green-900">Локалізація</p>
            </button>
          </li>
          <li className="flex   cursor-pointer hover:text-green-900 animate-pulse">
            <button className="flex gap-2 justify-center items-center ">
              <Image src={Gear} alt="Settings" className="w-6 h-6" />
              <p>Оновити даннi</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Webstatistics;
