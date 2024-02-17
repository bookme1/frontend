"use client";
import { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist/build/pdf";

const PDFViewer = () => {
  const url = "/src/app/read/[id]/2Timo darf nicht sterben.pdf";
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageIsRendering, setPageIsRendering] = useState(false);
  const [pageNumIsPending, setPageNumIsPending] = useState(null);
  const scale = 1.5;

  useEffect(() => {
    const canvas = document.querySelector("#pdf-render");
    const ctx = canvas.getContext("2d");

    const renderPage = (num) => {
      setPageIsRendering(true);
      pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
          canvasContext: ctx,
          viewport,
        };

        page.render(renderCtx).promise.then(() => {
          setPageIsRendering(false);

          if (pageNumIsPending !== null) {
            renderPage(pageNumIsPending);
            setPageNumIsPending(null);
          }
        });

        document.querySelector("#page-num").textContent = num;
      });
    };

    const queueRenderPage = (num) => {
      if (pageIsRendering) {
        setPageNumIsPending(num);
      } else {
        renderPage(num);
      }
    };

    const showPrevPage = () => {
      if (pageNum <= 1) return;
      setPageNum(pageNum - 1);
      queueRenderPage(pageNum - 1);
    };

    const showNextPage = () => {
      if (pageNum >= pdfDoc.numPages) return;
      setPageNum(pageNum + 1);
      queueRenderPage(pageNum + 1);
    };

    pdfjs
      .getDocument(url)
      .promise.then((pdf) => {
        setPdfDoc(pdf);
        document.querySelector("#page-count").textContent = pdf.numPages;
        renderPage(pageNum);
      })
      .catch((err) => {
        console.error("Error loading PDF:", err);
      });

    // Clean up
    return () => {
      setPdfDoc(null);
      setPageNum(1);
      setPageIsRendering(false);
      setPageNumIsPending(null);
    };
  }, [url]); // Only re-run the effect if the URL changes

  return (
    <>
      <div className="top-bar">
        <button className="btn" id="prev-page" onClick={showPrevPage}>
          <i className="fas fa-arrow-circle-left"></i> Prev Page
        </button>
        <button className="btn" id="next-page" onClick={showNextPage}>
          Next Page <i className="fas fa-arrow-circle-right"></i>
        </button>
        <span className="page-info">
          Page <span id="page-num"></span> of <span id="page-count"></span>
        </span>
      </div>
      <canvas id="pdf-render"></canvas>
    </>
  );
};

export default PDFViewer();
