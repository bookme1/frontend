"use client";
import { Headerstatistics } from "@/components/Headerstatistics";
import { ModalAddBook } from "@/components/Modaladdbook";
import { ModalDelete } from "@/components/Modaldelete";
import { Webstatistics } from "@/components/Webstatistics";
import { Icon } from "@/components/common/Icon";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <>
      <Headerstatistics />
      <div className="flex mt-10 gap-16 ">
        <Webstatistics />
        <div className=" w-3/4 h-3/6 rounded-2xl  border-slate-900 shadow-2xl py-3 text-green-900  ">
          <div className="flex px-10 justify-between pb-10  items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Пошук"
                className="border-2 rounded-lg py-2 w-80 indent-3 bg-transparent shadow-2xl  focus:outline-none  "
              />
              <Icon name="search" className="absolute top-3 right-4" />
            </div>
            <div className="flex gap-1">
              <button className="border-2 rounded-lg p-2 shadow-2xl border-r-0 rounded-r-none">
                Книги
              </button>

              <button className="border-2 rounded-lg p-2 shadow-2xl border-l-0 rounded-l-none">
                Набори
              </button>
            </div>
            <div className="flex items-center gap-10">
              <p className=" items-center">
                Всього: <span className=" font-bold ">9999</span>{" "}
              </p>

              <button
                className=" border px-3 py-2 rounded-lg bg-green-900 text-white"
                onClick={() => setShowModal(true)}
              >
                Додати книгу
              </button>
            </div>
          </div>
          <div className="flex px-9  gap-44 font-bold ">
            {" "}
            <p>Назва</p>
            <p className="pl-12">Жанр</p>
            <p>Артикул</p>
            <p>Ціна</p>
          </div>

          <hr className="mt-3 mb-3" />
          <div className="flex flex-col px-10    ">
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button onClick={() => setShowModal2(true)}>
                  <Icon name="delete" size={34} className=" " />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center  gap-44 py-1   ">
              <p>Назва книги</p>
              <p>Жанр</p>
              <p>Артикул</p>
              <p>Ціна</p>
              <div className="flex  gap-5">
                <button className="  ">
                  <Icon name="edit" size={34} className="  " />{" "}
                </button>
                <button>
                  <Icon
                    name="delete"
                    size={34}
                    className=" "
                    onClick={() => setShowModal2(true)}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddBook isVisible={showModal} onClose={() => setShowModal(false)} />
      <ModalDelete
        isVisible={showModal2}
        onClose={() => setShowModal2(false)}
      />
    </>
  );
}
