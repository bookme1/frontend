// 'use client';
// import React, { useState } from 'react';
// import styles from './DesktopCatalog.module.css';
// import { Icon } from '../../common/Icon';
// import categories from './categoriesData.json'; // Предположим, что categoriesData.json содержит данные о категориях.
// import { useWindowSize } from '../../../hooks/useWindowSize';
// import Menu from '@/components/main/DesktopCatalog/Menu.tsx';

// const DesktopCatalog = ({ setIsOpen }: { setIsOpen: any }) => {
//   const clientWidth = useWindowSize().width;
//   const [isSubShown, setIsSubShown] = useState(false);
//   const [categoryToShow, setCategoryToShow] = useState('');

//   const handleCloseModal = () => {
//     setIsOpen(false);
//   };

//   const showCategory = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const category = (e.target as HTMLButtonElement).getAttribute('data-category');
//     setCategoryToShow(category || '');
//     setIsSubShown(true);
//   };

//   const categoriesMarkup = categories.map((category, index) => {
//     return (
//       <li key={category.genre}>
//         <button
//           onClick={showCategory}
//           data-category={category.genre}
//           className={`${styles.categoryButton}`}
//         >
//           {category.genre} ({category.count})
//           <Icon name="arrow_right" />
//         </button>
//       </li>
//     );
//   });

//   const subCategoriesMarkup = (categoryToFind: string) => {
//     const resCategory = categories.find(
//       (category) => category.genre === categoryToFind
//     );
//     return resCategory?.children.map((subCategory) => {
//       return (
//         <li key={subCategory} className={styles.subCategory}>
//           <button className={styles.categoryButton}>{subCategory}</button>
//         </li>
//       );
//     });
//   };

//   return (
//     <div className={styles.modalWindow} onClick={handleCloseModal}>
//       <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
//         <Menu categories={categories} />
//         <ul
//           className={`${styles.categoryList} ${clientWidth && clientWidth < 768 ? styles.categoryListScrolled : ''}`}
//         >
//           {categoriesMarkup}
//           {clientWidth && clientWidth < 768 && isSubShown && (
//             <li>
//               <button
//                 onClick={() => {
//                   setIsSubShown(false);
//                 }}
//                 className={`${styles.categoryButton} ${styles.backButton}`}
//               >
//                 <Icon name="arrow_left" /> Назад
//               </button>
//             </li>
//           )}
//           {clientWidth && clientWidth < 768 && isSubShown
//             ? subCategoriesMarkup(categoryToShow)
//             : null}
//         </ul>
//         {clientWidth && clientWidth > 768 && isSubShown && (
//           <div>TEST</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DesktopCatalog;
