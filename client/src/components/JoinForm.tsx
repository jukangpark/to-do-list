import { useForm } from "react-hook-form";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const Form = styled.form`
  max-width: 420px;
  margin: 0 auto;
`;

const BtnContainer = styled.div`
  width: 420px;
  margin: 0 auto;
  margin-top: 150px;
`;

const Btn = styled.button<{ styleName: string }>`
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

const Input = styled.input`
  width: 420px;
  height: 40px;
  margin-top: 20px;
  padding: 0px;
  padding-left: 10px;
  box-sizing: border-box;
  display: block;
`;

const ErrorMessage = styled.span`
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
  color: ${(props) => props.theme.textColor};
`;

interface IFormData {
  id: string;
  password1: string;
  password2: string;
}

const JoinForm = () => {
  const onValid = ({ id, password1, password2 }: IFormData) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  return (
    <div>
      <BtnContainer>
        <Btn styleName={"kakao"}>카카오 계정으로 신규 가입</Btn>
        <Btn styleName={"github"}>깃헙 계정으로 신규 가입</Btn>
      </BtnContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("id", {
            required: "ID를 입력해주세요",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "올바르지 않은 이메일 형식입니다.",
            },
          })}
          placeholder="사용하실 ID를 입력해주세요.(수신 가능 E-mail)"
          type="email"
        />
        <ErrorMessage>{errors.id?.message}</ErrorMessage>

        <Input
          {...register("password1", {
            required: "비밀번호를 입력해주세요",
          })}
          placeholder={`비밀번호`}
          type="password"
        />
        <ErrorMessage>{errors.password1?.message}</ErrorMessage>

        <Input
          {...register("password2", {
            required: "비밀번호를 입력해주세요",
          })}
          placeholder={`비밀번호 확인`}
          type="password"
        />
        <ErrorMessage>{errors.password2?.message}</ErrorMessage>

        <Btn styleName={"join"}>{`회원가입하기 (만 14세 이상)`}</Btn>
      </Form>
    </div>
  );
};

export default JoinForm;
