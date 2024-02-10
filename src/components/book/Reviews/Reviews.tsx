"use client";
import { Icon } from "@/components/common/Icon";
import { Wrapper } from "@/styles/globals.styles";
import styled from "@emotion/styled";

const ReviewsContainer = styled.section`
  margin-bottom: 64px;
  @media (min-width: 768px) {
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 32px 20px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const ControlButton = styled.button`
  width: 163.5px;
  background-color: var(--gray_border);
  color: white;
  padding: 10px 0;
  border-radius: 8px;
  &.active {
    background-color: var(--red);
  }
`;

const Review = styled.div`
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    width: 392px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReviewUsername = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const ReviewDate = styled.p`
  font-variant-numeric: lining-nums proportional-nums;
  color: var(--gray_dark);
`;

const GradeContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Grade = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Comment = styled.p`
  font-size: 18px;
  color: var(--gray_dark);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const GradeIcon = styled(Icon)`
  color: var(--gray_border);
  &.active {
    color: var(--red);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
`;

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
