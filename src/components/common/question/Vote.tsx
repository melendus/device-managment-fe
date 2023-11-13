import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import colorConfigs from "../../../configs/colorConfigs";
import { useAppSelector } from "../../../hooks/hooks";
import { getAllVotes, getVote } from "../../../services/VoteQuestionApi";
import { voteQuestion } from "../../../services/QuestionApi";

const pulseAnimation = keyframes`
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  font-family: Montserrat, sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 15px;
  background-color: white;
  color: ${colorConfigs.vote.gray5};
  padding-top: 33px;
`;

const Header = styled.h1`
  font-size: 25px;
  padding: 10px;

  &.positive {
    color: ${colorConfigs.vote.positive};
    animation: ${pulseAnimation} 500ms ease-in-out;
  }

  &.negative {
    color: ${colorConfigs.vote.negative};
    animation: ${pulseAnimation} 500ms ease-in-out;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > button {
    border: none;
    background-color: white;
    box-shadow: 0px 0px 10px ${colorConfigs.vote.gray2};
    font-weight: bold;
    font-size: 1rem;
    color: inherit;
    border-radius: 50%;
    outline: none;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    transition: background-color 250ms ease-in-out, transform 50ms ease-in-out;

    &:hover {
      background-color: ${colorConfigs.vote.gray2};
    }

    &:active {
      transform: scale(0.9);
    }

    &:focus {
      box-shadow: 0 0 0 3px ${colorConfigs.vote.gray5};
    }
  }
`;
interface VoteProps {
  question: any;
}
const Vote = ({ question }: VoteProps) => {
  const [count, setCount] = useState(0);
  const [currentUserVoteValue, setCurrentUserVoteValue] = useState(0);

  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentUser = currentUserState.currentUser;

  useEffect(() => {
    const fetchNumberOfVotes = async () => {
      const res = await getAllVotes(question.id);
      if (res.data === "") {
        setCount(0);
      } else {
        setCount(res.data);
      }

      const currentUserVote = await getVote(
        currentUser.id.toString(),
        question.id
      );
      if (currentUserVote.data == "") {
        setCurrentUserVoteValue(0);
      } else if (currentUserVote.data.value === 1) {
        setCurrentUserVoteValue(1);
      } else if (currentUserVote.data.value === -1) {
        setCurrentUserVoteValue(-1);
      } else if (currentUserVote.data.value === 0) {
        setCurrentUserVoteValue(0);
      }
    };
    fetchNumberOfVotes();
  }, [currentUserVoteValue, question]);

  const onClickUp = async () => {
    await voteQuestion({
      userId: currentUser.id.toString(),
      questionId: question.id,
      value: 1,
    });
    setCurrentUserVoteValue(1);
  };

  const onClickDown = async () => {
    await voteQuestion({
      userId: currentUser.id.toString(),
      questionId: question.id,
      value: -1,
    });
    if (currentUserVoteValue === 1) {
      await voteQuestion({
        userId: currentUser.id.toString(),
        questionId: question.id,
        value: 0,
      });
      setCurrentUserVoteValue(0);
    } else if (currentUserVoteValue === 0) {
      await voteQuestion({
        userId: currentUser.id.toString(),
        questionId: question.id,
        value: -1,
      });
      setCurrentUserVoteValue(-1);
    }
  };

  console.log(currentUserVoteValue === 1);

  return (
    <Container>
      <ButtonWrapper aria-disabled={currentUserVoteValue === 1}>
        {currentUserVoteValue !== 1 && (
          <button onClick={() => onClickUp()}>+</button>
        )}
        {currentUserVoteValue !== -1 && (
          <button onClick={() => onClickDown()}>-</button>
        )}
      </ButtonWrapper>
      <Header
        className={count > 0 ? "positive" : count < 0 ? "negative" : undefined}
      >
        {count}
      </Header>
    </Container>
  );
};

export default Vote;
