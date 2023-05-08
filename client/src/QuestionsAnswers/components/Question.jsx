import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import AnswersList from './AnswersList';
import Button from '../../components/ui/Button';
import Divider from '../../components/Divider';
import Helpful from '../../components/Helpful';
import Report from '../../components/Report';

import { LargeLetter, FlexBetween } from '../styles';

const StyledQuestion = styled.div`
  position: relative;
  & .question {
    font-size: 1.4rem;
    font-weight: bold;
    &::before {
      content: "Q";
      ${LargeLetter}
    }
  }
  & .accordion-title {
    border-radius: 5px;
    padding: 10px 40px 10px 0;
    background-color: #eee;
    border-bottom: 2px solid ${(props) => props.theme.secondaryColor};
    margin-top: 10px;
    position: relative;
    cursor: pointer;

    &:hover .question {
      color: ${(props) => props.theme.secondaryColor};
    }
    &.open::after, &.closed::after {
      content: '\uf077';
      position: absolute;
      top: 50%;
      right: 15px;
      font-family: "Font Awesome 5 Free";
      transition: 0.5s;
    }
    &.open::after {
      transform: translateY(-50%) scaleY(1);
    }
    &.closed::after {
      transform: translateY(-50%) scaleY(-1);
    }
  }

  & .big-A {
    ${LargeLetter}
    top: 0;
    position: sticky;
  }
  & .accordion-body {
    transition: 0.5s ease-in-out;
    overflow: scroll;
  }
  & .open + .accordion-body {
    max-height: 50vh;
  }
  & .closed + .accordion-body {
    max-height: 0;
  }
`;

export default function Question({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const answerCount = useRef(Object.entries(question.answers).length);

  const handleAccordionClick = () => {
    setShowAnswers(!showAnswers);
  };

  const handleHelpful = (e) => {
    e.stopPropagation();
  };

  const handleAddAnswer = (e) => {
    e.stopPropagation();
  };

  const handleReportQuestion = (e) => {
    e.stopPropagation();
  };
  console.log(question);
  return (
    <StyledQuestion>
      <FlexBetween className={`accordion-title ${((showAnswers && answerCount.current !== 0) ? 'open' : 'closed')}`} onClick={handleAccordionClick}>
        <span className="question">{question.question_body}</span>
        <span>
          <Divider>
            <Helpful helpfulness={question.question_helpfulness} onClick={handleHelpful} />
            <Button variant="small" onClick={handleAddAnswer}>Add Answer</Button>
            <Report onClick={handleReportQuestion} />
          </Divider>
        </span>
      </FlexBetween>
      <div className="accordion-body">
        {answerCount.current !== 0
          ? (
            <>
              <span className="big-A">A</span>
              <AnswersList className="answers" answers={question.answers} />
            </>
          )
          : ''}
      </div>
    </StyledQuestion>
  );
}
