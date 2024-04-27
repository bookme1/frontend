"use client";
import React, { useEffect } from "react";
export default function ModalAddBook({ isVisible, onClose }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className=" w-[700px] ">
        {" "}
        <div className=" bg-white p-5 rounded-lg text-green-900">
          <div className="flex items-center gap-10 mb-5">
            <label className=" flex flex-col w-72 ">
              Назва
              <input
                type="text"
                placeholder="Назва"
                className="border-2 indent-3 p-1 rounded-lg shadow-lg"
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              <p className=" opacity-0">Категория</p>
              <select
                name=""
                id=""
                className="border-2 p-1.5 px-3 rounded-lg shadow-lg w-36"
              >
                <option value="" disabled selected>
                  Категорія
                </option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
            </label>
            <label htmlFor="">
              <p className=" opacity-0">Мова</p>
              <select
                name=""
                id=""
                className="border-2 p-1.5 rounded-lg shadow-lg px-2 w-36"
              >
                <option value="" disabled selected>
                  Мова
                </option>
                <option value="">Українська</option>
                <option value="">Англiйська</option>
                <option value="">Нiмецька</option>
              </select>
            </label>
          </div>
          <div className="flex gap-10 mb-5">
            <label>
              {" "}
              Автор
              <input
                type="text"
                placeholder="Автор"
                className=" indent-3 border-2 w-72  rounded-lg shadow-lg p-1"
              />
            </label>
            <label>
              Ціна
              <input
                type="text"
                placeholder="Ціна"
                className=" indent-3 border-2  rounded-lg shadow-lg p-1 w-36"
              />
            </label>
            <label>
              Сторінки
              <input
                type="text"
                placeholder="Сторінки"
                className=" indent-3 border-2 rounded-lg shadow-lg p-1 w-36 "
              />
            </label>
          </div>
          <div className="flex gap-1 mb-5 ">
            <label className="flex flex-col w-6/12">
              Видавництво
              <input
                type="text"
                placeholder="Видавництво"
                className=" indent-3 border-2 w-72  rounded-lg shadow-lg p-1"
              />
            </label>
            <label className="flex flex-col ">
              URL Картинки
              <input
                type="text"
                placeholder="url"
                className=" indent-3 border-2 w-80  rounded-lg shadow-lg p-1"
              />
            </label>
          </div>
          <div className="flex flex-col mb-5">
            <label for="description" class=" text-gray-700">
              Опис
            </label>
            <textarea
              placeholder="Опис"
              id="description"
              name="description"
              rows="5"
              className="mt-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-900 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-between ">
            <button className="border-2 p-1 rounded-lg px-20 hover:bg-green-900 hover:text-white">
              Зберегти
            </button>
            <button
              onClick={() => onClose()}
              className="border-2 p-1 rounded-lg px-20 hover:bg-green-900 hover:text-white"
            >
              Відміна
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
