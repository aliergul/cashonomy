interface SignUpFormProps {
  handleAuthType: (type: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleAuthType }) => {
  console.log("handleAuthType", handleAuthType);
  return <div>SignUpForm</div>;
};

export default SignUpForm;
