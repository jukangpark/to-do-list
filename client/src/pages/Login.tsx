import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  Btn,
  BtnContainer,
  ErrorMessage,
  Form,
  Input,
} from "../components/FormComponents";

export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

interface IFormData {
  id: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormData>();

  const navigate = useNavigate();

  const onValid = ({ id, password }: IFormData) => {
    setValue("id", "");
    setValue("password", "");

    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.result === "ok") {
          localStorage.setItem("isLoggedIn", "true");
          navigate("/");
        } else {
          throw new Error(data.error);
        }
      });
  };

  return (
    <div>
      <BtnContainer>
        <Title>로그인</Title>
        <Btn styleName={"kakao"}>카카오 계정으로 로그인</Btn>
        <Btn styleName={"github"}>깃헙 계정으로 로그인</Btn>
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
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
          placeholder={`비밀번호`}
          type="password"
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Btn styleName={"join"}>{`로그인`}</Btn>
        <span>
          계정이 없으신가요? <Link to="/join">회원가입</Link>
        </span>
      </Form>
    </div>
  );
};

export default Login;
