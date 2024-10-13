import { useDispatch, useSelector } from "react-redux";
import Card from "../../organisms/LoginCard/Card";
import LoginQuery from "@utils/queries/LoginQuery";
import React from "react";

import { login, selectToken } from "@store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "@utils/cookies";

function Login() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const signIn = async (formEvent: any) => {
    formEvent.preventDefault();
    const { email, password } = formEvent.target.elements;
    const data = await LoginQuery({
      email: email.value,
      password: password.value,
    });

    if (data.token) {
      dispatch(login("Bearer " + data.token));
      setCookie("token", data.token);
      navigate("/app");
    }
  };



  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex w-full justify-center items-center flex-col h-screen bg-dark-blue">
      <Card onSubmit={signIn} />
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
