"use client";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { SliderLastBooks } from "@/components/book/SliderLastBooks";
import { MainInformation } from "@/components/book/MainInformation";
import { Reviews } from "@/components/book/Reviews";
import { bookService } from "@/api/book/bookService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {  useDispatch, useSelector } from "react-redux";
import {  fetchAllBooks, selectBooks } from "@/lib/redux";

export default function Home() {
  const dispatch = useDispatch();
  const booksArr = useSelector(selectBooks);

  // useEffect(() => {
  //   dispatch(fetchAllBooks());
  // }, [dispatch]);


  const [book, setBook] = useState<{
    title: string;
    author: string;
    url: string;
    price: number;
  } | null>(null);

  const mockBook = {
    name: "Усвідомленість. Як знайти гармонію в нашому шаленому світі",
    price: 290,
    authors: "Денні Пенман, Марк Вільямс",
    url: "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/u/s/usvidomlenist-cover-1-728x1000.jpg",
    characteristics: {
      language: "Українська",
      publish: "Monolit Bizz",
      pages: 256,
      cover: "тверда",
      description:
        "Практика усвідомленості на Заході давно рятує мільйони людей від хронічного стресу і депресії, чи не найпоширеніших недуг сучасного світу. Сьогодні і в Україні вона стрімко стає популярною. Одним із фундаторів «терапії усвідомленості» є професор Марк Вільямс. Разом із доктором Денні Пенманом вони створили цю книжку.Практика усвідомленості на Заході давно рятує мільйони людей від хронічного стресу і депресії, чи не найпоширеніших недуг сучасного світу. Сьогодні і в Україні вона стрімко стає популярною. Одним із фундаторів «терапії усвідомленості» є професор Марк Вільямс. Разом із доктором Денні Пенманом вони створили цю книжку.",
    },
  };
  const router = usePathname();
  const id = router?.split("/").pop();
  useEffect(() => {
  
    if (id === undefined) {
      return;
    }
    // const fetchBook = async () => {
    //   try {
    //     const bookData = await bookService.getBookById(id);
    //     setBook(bookData);
    //   } catch (error) {
    //     console.error("Error fetching book:", error);
    //   }
    // };
    // fetchBook();
    const res = booksArr.filter((book: any) => book.id === id);
    setBook(res);
    console.log(res)
  }, [booksArr, id ]);

  console.log(book)
  console.log(id)




  return (
    <>
      <Header />
      {book && <BreadCrumbs name={book.title} />}
      {book && (
        <MainInformation
          authors={book.author}
          url={book.url}
          price={book.price}
          name={book.title}
          
          characteristics={mockBook.characteristics}
        />
      )}
      <Reviews />
      <SliderLastBooks />
      <Footer />
    </>
  );
}
