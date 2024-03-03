"use client";
import { Wrapper } from "@/styles/globals.styles";
import {
  Grade,
  GradeIcon,
  ReviewsContainer,
  GradeContainer,
  Comment,
  ReviewDate,
  ReviewUsername,
  Title,
  ControlsContainer,
  ControlButton,
  Review,
  TopContainer,
  TopLeftContainer,
} from "./Reviews.styles";

const Reviews = () => {
  const mockUser = {
    name: "Акакій",
    date: new Date(),
    grade: 3,
    comment:
      "Практика усвідомленості на Заході давно рятує мільйони людей від хронічного стресу",
  };

  const gradeMarkup = (grade: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = i <= grade;
      stars.push(
        <Grade key={i}>
          <GradeIcon
            name="star"
            className={isActive ? "active" : ""}
            size={30}
          />
        </Grade>
      );
    }
    return stars;
  };

  return (
    <Wrapper>
      <ReviewsContainer>
        <Title>Відгуки</Title>
        <ControlsContainer>
          <ControlButton className="active">Читати</ControlButton>
          <ControlButton>Додати відгук</ControlButton>
        </ControlsContainer>
        <Review>
          <TopContainer>
            <TopLeftContainer>
              <ReviewUsername>{mockUser.name}</ReviewUsername>
              <ReviewDate>{mockUser.date.toLocaleDateString()}</ReviewDate>
            </TopLeftContainer>
            <GradeContainer>{gradeMarkup(mockUser.grade)}</GradeContainer>
          </TopContainer>
          <Comment>{mockUser.comment}</Comment>
        </Review>
      </ReviewsContainer>
    </Wrapper>
  );
};

export default Reviews;
