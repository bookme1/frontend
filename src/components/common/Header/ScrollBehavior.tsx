"use client";
import React, { useEffect } from "react";

const ScrollBehavior = () => {
  useEffect(() => {
    const body = document.body;

    if (body) {
      const scrollUp = "scroll-up";
      const scrollDown = "scroll-down";
      let lastScroll = 0;

      const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll <= 0) {
          body.classList.remove(scrollUp);
          return;
        }

        if (
          currentScroll > lastScroll &&
          !body.classList.contains(scrollDown)
        ) {
          // down
          body.classList.remove(scrollUp);
          body.classList.add(scrollDown);
        } else if (
          currentScroll < lastScroll &&
          body.classList.contains(scrollDown)
        ) {
          // up
          body.classList.remove(scrollDown);
          body.classList.add(scrollUp);
        }
        lastScroll = currentScroll;
      };

      window.addEventListener("scroll", handleScroll);

      // Очистка слушателя при размонтировании компонента
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []); // Пустой массив зависимостей означает, что эффект будет запущен только один раз при монтировании компонента

  return null; // Компонент не рендерит ничего
};

export default ScrollBehavior;
