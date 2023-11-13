import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import colorConfigs from "../../../configs/colorConfigs";
import { useAppSelector } from "../../../hooks/hooks";
import { getAllVotes, getVote } from "../../../services/VoteQuestionApi";
import {
  getAllVotesAnswer,
  getVoteAnswer,
} from "../../../services/VoteAnswerApi";
import { voteAnswer, voteQuestion } from "../../../services/QuestionApi";

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

interface VoteAnswerProps {
  answer: any;
}
const VoteAnswer = ({ answer }: VoteAnswerProps) => {
  const [count, setCount] = useState(0);

  const [currentUserVoteValue, setCurrentUserVoteValue] = useState(0);

  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentUser = currentUserState.currentUser;

  useEffect(() => {
    const fetchNumberOfVotes = async () => {
      if (answer.answerId === -1) {
        return;
      }
      const res = await getAllVotesAnswer(answer.answerId);
      if (res.data === "") {
        setCount(0);
      } else {
        setCount(res.data);
      }

      const currentUserVote = await getVoteAnswer(
        currentUser.id.toString(),
        answer.answerId
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
  }, [currentUserVoteValue, answer]);

  const onClickUp = async () => {
    await voteAnswer({
      userId: currentUser.id.toString(),
      answerId: answer.answerId,
      value: 1,
    });
    setCurrentUserVoteValue(1);
  };

  const onClickDown = async () => {
    await voteAnswer({
      userId: currentUser.id.toString(),
      answerId: answer.answerId,
      value: -1,
    });
    if (currentUserVoteValue === 1) {
      await voteAnswer({
        userId: currentUser.id.toString(),
        answerId: answer.answerId,
        value: 0,
      });
      setCurrentUserVoteValue(0);
    } else if (currentUserVoteValue === 0) {
      await voteAnswer({
        userId: currentUser.id.toString(),
        answerId: answer.answerId,
        value: -1,
      });
      setCurrentUserVoteValue(-1);
    }
  };

  return (
    <Container>
      <ButtonWrapper>
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

export default VoteAnswer;
