import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RequiredStyle = styled.span`
  color: #bb3838;
`;
const StyledInput = styled.div`
  margin: 20px 0;
  & .warning {
    margin: 5px 0;
    background-color: #ffffc1;
    padding: 20px;
    padding-left: 40px;
    border-radius: 5px;
    border: 1px solid #bebe48;
    position: relative;

    &::before {
      content: '!';
      font-family: verdana;
      color: #bebe48;
      font-size: 2rem;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%) rotate(10deg);
    }
  }
  & input {
    display: block;
    font-size: 0.9rem;
    padding: 5px;
    min-width:
  }
`;

export default function Input({
  validation,
  label,
  id,
  warning,
  required,
  ...props
}) {
  return (
    <StyledInput>
      {
        label
          ? (
            <label htmlFor={id}>
              {label}
              {required && <RequiredStyle>*</RequiredStyle>}
              <input type="text" id={id} {...props} />
            </label>
          )
          : <input type="text" id={id} {...props} />
      }
      <div className="warning">{warning}</div>
    </StyledInput>
  );
}

Input.propTypes = {
  validation: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  warning: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  validation: null,
  label: undefined,
  warning: undefined,
  required: false,
};
