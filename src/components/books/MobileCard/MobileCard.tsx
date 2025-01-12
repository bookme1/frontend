// "use client";
// import { Icon } from "@/components/common/Icon";
// import {
//   AuthorsList,
//   BottomContainer,
//   CartButton,
//   ContentContainer,
//   Controls,
//   HeartButton,
//   ImageContainer,
//   Price,
//   StyledWrapper,
//   Title,
// } from "./MobileCard.styles";

// const MobileCard = () => {
//   const mockBook = {
//     title: "Я бачу, вас цікавить пітьма",
//     url: "https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/y/a/ya_bachu_vas_cikavytj_pitjma_cover_full.jpg",
//     price: 199,
//     authors: "Бессер Ван, Дер Колк",
//   };
//   return (
//     <StyledWrapper>
//       <ImageContainer
//         style={{ ["--background-image" as string]: `url(${mockBook.url})` }}
//       ></ImageContainer>
//       <ContentContainer>
//         <Title>{mockBook.title}</Title>
//         <AuthorsList>{mockBook.authors}</AuthorsList>
//         <BottomContainer>
//           <Price>{mockBook.price} ₴</Price>
//           <Controls>
//             <HeartButton>
//               <Icon name="heart" size={24} />
//             </HeartButton>
//             <CartButton>
//               <Icon name="cart" size={24} color="#fff" />
//             </CartButton>
//           </Controls>
//         </BottomContainer>
//       </ContentContainer>
//     </StyledWrapper>
//   );
// };

// export default MobileCard;
