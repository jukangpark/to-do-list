import styled from "styled-components";

export const Form = styled.form`
  max-width: 420px;
  margin: 0 auto;
`;

export const BtnContainer = styled.div`
  width: 420px;
  margin: 0 auto;
  margin-top: 150px;
`;

export const Btn = styled.button<{ styleName: string }>`
  width: 420px;
  height: 40px;
  margin-top: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: ${(props) =>
    props.styleName === "kakao"
      ? "#FEEC34"
      : props.styleName === "join"
      ? "whitesmoke"
      : "black"};

  color: ${(props) =>
    props.styleName === "kakao"
      ? "#black"
      : props.styleName === "join"
      ? "black"
      : "white"};

  &:hover {
    background-color: ${(props) =>
      props.styleName === "join" ? "black" : null};
    color: ${(props) => (props.styleName === "join" ? "white" : null)};
    transition-duration: 400ms;
  }
`;

export const Input = styled.input`
  width: 420px;
  height: 40px;
  margin-top: 20px;
  padding: 0px;
  padding-left: 10px;
  box-sizing: border-box;
  display: block;
`;

export const ErrorMessage = styled.span`
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
  color: ${(props) => props.theme.textColor};
`;
