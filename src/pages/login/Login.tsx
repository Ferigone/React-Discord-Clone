import React from "react";
import { auth, provider } from "../../utils/firebase";

import { FaDiscord } from "react-icons/fa";

function Login() {
  const signIn = () => {
    // google login
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="flex w-full justify-center items-center flex-col">
        <div className="flex justify-center">
          <FaDiscord className="fill-blue-300 h-16 w-16"/>
        </div>

        <button onClick={signIn} className="bg-blue-500 hover:bg-blue-400 rounded-[5px] px-5 py-2 text-white">
          Sign In With Google
        </button>
    </div>
  );
}

export default Login;
