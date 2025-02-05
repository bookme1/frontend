'use client';

import React from 'react';
import { FaCodePullRequest } from 'react-icons/fa6';
import { GrUpdate } from 'react-icons/gr';

import Image from 'next/image';

import Gear from '@/assets/account/gear.png';

import { Icon } from '../common/Icon';


const Webstatistics = () => {

    return (
        <>
            <div className="w-max">
                <ul className="flex-col ml-20  text-gray-500 ">
                    <li className="flex gap-3 mb-6 cursor-pointer  hover:text-green-900  ">
                        <button className="flex gap-2 justify-center items-center ">
                            <Icon name="mainhome" />
                            <a href="/admin" className="hover:text-green-900">
                                Головна
                            </a>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900 ">
                        <button className="flex gap-2 justify-center items-center ">
                            <GrUpdate />
                            <a
                                href="/admin/book-update"
                                className="hover:text-green-900 text-left"
                            >
                                Стягнути нові книжки
                            </a>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
                        <button className="flex gap-2 justify-center items-center ">
                            <Icon name="group" />
                            <a
                                href="/admin/users"
                                className="hover:text-green-900"
                            >
                                Користувачі
                            </a>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
                        <button className="flex gap-2 justify-center items-center ">
                            <FaCodePullRequest />
                            <a
                                href="/admin/ping"
                                className="hover:text-green-900"
                            >
                                Elibri Запити
                            </a>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
                        <button className="flex gap-2 justify-center items-center ">
                            <Icon name="menubook" />
                            <p className="hover:text-green-900 text-gray-300">
                                Книги
                            </p>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
                        <button
                            className="flex gap-2 justify-center items-center "
                        >
                            <Icon name="album" />
                            <a
                                href="/admin/booksets"
                                className="hover:text-green-900"
                            >
                                Набори
                            </a>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900  ">
                        <button className="flex gap-2 justify-center items-center ">
                            <Icon name="sales" />
                            <p className="hover:text-green-900 text-gray-300">
                                Продажі
                            </p>
                        </button>
                    </li>
                    <li className="flex gap-3 mb-6 cursor-pointer hover:text-green-900 ">
                        <button className="flex gap-2 justify-center items-center ">
                            <Icon name="localization" />
                            <p className="hover:text-green-900 text-gray-300">
                                Локалізація
                            </p>
                        </button>
                    </li>
                    <li className="flex   cursor-pointer hover:text-green-900">
                        <button className="flex gap-2 justify-center items-center ">
                            <Image
                                src={Gear}
                                alt="Settings"
                                className="w-6 h-6"
                            />
                            <p className="hover:text-green-900 text-gray-300">
                                Оновити даннi
                            </p>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Webstatistics;
