import {
  ModalWindow,
  ModalContainer,
  CloseButton,
} from "./DesktopCatalog.styles";
import { Icon } from "../../common/Icon";

import styled from "@emotion/styled";

import categories from "@/data/categories.json";
import { useState } from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  gap: 8px;
  font-size: 18px;
  padding-bottom: 50px;
  @media (min-width: 768px) {
    gap: 16px;
    overflow-y: scroll;
    height: calc(100vh - 200px);
  }
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray_border);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #e5e5e5;
  }
`;

const Category = styled.li`
  &.sub {
    padding-right: 40px;
  }
`;

const CategoryButton = styled.button`
  text-transform: capitalize;
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px;
  border-radius: 8px 0px 0px 8px;
  &.back {
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    color: var(--red);
    font-size: 18px;
  }
  &.active {
    color: white;
    background-color: var(--red);
  }
`;

const DesktopCatalog = ({ setIsOpen }: { setIsOpen: any }) => {
  const clientWidth = useWindowSize().width;
  const [isSubShown, setIsSubShown] = useState(false);
  const [categoryToShow, setCategoryToShow] = useState("");
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const showCategory = (e: any) => {
    e.preventDefault();
    const category = e.target.getAttribute("data-category");
    const prevCategory = document.querySelector(
      `[data-category="${categoryToShow}"]`
    );
    const activeCategory = document.querySelector(
      `[data-category="${category}"]`
    );
    prevCategory?.classList.remove("active");
    activeCategory?.classList.add("active");
    setCategoryToShow(category);
    setIsSubShown(true);
  };

  const categoriesMarkup = categories.map((category) => {
    return (
      <Category key={category.id}>
        <CategoryButton
          onClick={(e) => {
            showCategory(e);
          }}
          data-category={category.name}
        >
          {category.name}
          <Icon name="arrow_right" />
        </CategoryButton>
      </Category>
    );
  });
  const subCategoriesMarkup = (categoryToFind: string) => {
    const resCategory = categories.find(
      (category) => category.name == categoryToFind
    );
    return resCategory?.children.map((subCategory) => {
      return (
        <Category key={subCategory} className="sub">
          <CategoryButton>{subCategory}</CategoryButton>
        </Category>
      );
    });
  };

  return (
    <ModalWindow
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CategoryList>
          {clientWidth && clientWidth < 768 && isSubShown && (
            <Category>
              <CategoryButton
                onClick={() => {
                  setIsSubShown(false);
                }}
                className="back"
              >
                <Icon name="arrow_left" />
                Назад
              </CategoryButton>
            </Category>
          )}
          {clientWidth && clientWidth < 768 && isSubShown
            ? subCategoriesMarkup(categoryToShow)
            : categoriesMarkup}
        </CategoryList>
        {clientWidth && clientWidth > 768 && isSubShown && (
          <CategoryList>{subCategoriesMarkup(categoryToShow)}</CategoryList>
        )}
      </ModalContainer>
    </ModalWindow>
  );
};

export default DesktopCatalog;
