import Card from "../../Components/LoginCard/Card";
import LoginQuery from "../../utils/queries/LoginQuery";

function Login() {
  const signIn = async (formEvent: any) => {
    formEvent.preventDefault();
    const { email, password } = formEvent.target.elements;
    const data = await LoginQuery({
      email: email.value,
      password: password.value,
    });
    console.log(data);
  };

  return (
    <div className="flex w-full justify-center items-center flex-col h-screen bg-dark-blue">
      <Card onSubmit={signIn} />
    </div>
  );
}

export default Login;
