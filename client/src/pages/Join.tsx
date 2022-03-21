import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  BtnContainer,
  Form,
  Input,
  ErrorMessage,
  Btn,
} from "../components/FormComponents";

import { Title } from "./Login";

interface IFormData {
  id: string;
  password: string;
  password2: string;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormData>();

  const navigate = useNavigate();

  const onValid = ({ id, password, password2 }: IFormData) => {
    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    setValue("id", "");
    setValue("password", "");
    setValue("password2", "");

    fetch("/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
        password2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.result === "ok") {
          navigate("/");
        }
      });
  };

  return (
    <div>
      <BtnContainer>
        <Title>회원 가입</Title>
        <Btn styleName={"kakao"}>카카오 계정으로 회원 가입</Btn>
        <Btn styleName={"github"}>깃헙 계정으로 회원 가입</Btn>
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

        <Input
          {...register("password2", {
            required: "비밀번호를 입력해주세요",
          })}
          placeholder={`비밀번호 확인`}
          type="password"
        />
        <ErrorMessage>{errors.password2?.message}</ErrorMessage>

        <Btn styleName={"join"}>{`회원가입`}</Btn>
        <span>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </span>
      </Form>
    </div>
  );
};

export default Join;
