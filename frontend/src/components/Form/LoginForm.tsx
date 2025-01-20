interface LoginFormProps {
  handleAuthType: (type: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleAuthType }) => {
  console.log("handleAuthType", handleAuthType);
  return <div className="">LoginForm</div>;
};

export default LoginForm;
