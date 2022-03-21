import { useForm } from "react-hook-form";
import {
  Btn,
  BtnContainer,
  ErrorMessage,
  Form,
  Input,
} from "../components/FormComponents";

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

  const onValid = ({ id, password }: IFormData) => {
    setValue("id", "");
    setValue("password", "");

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        password,
      }),
    });
  };

  return (
    <div>
      <BtnContainer>
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
      </Form>
    </div>
  );
};

export default Login;
