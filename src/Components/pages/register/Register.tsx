import { useDispatch, useSelector } from "react-redux";
import LoginQuery from "@utils/queries/LoginQuery";
import React, { useState } from "react";

import { login, selectToken } from "@store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "@utils/cookies";
import Card from "@organisms/RegisterCard/Card";

function Login() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (formEvent: any) => {
    setIsLoading(true);
    formEvent.preventDefault();
    const { email, password } = formEvent.target.elements;
    const data = await LoginQuery({
      email: email.value,
      password: password.value,
    });
    setIsLoading(false);

    if (data?.token) {
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
      <Card onSubmit={signIn} isLoading={isLoading} />
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
