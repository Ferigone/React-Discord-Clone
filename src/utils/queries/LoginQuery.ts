type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  token?: string;
  message?: string;
  status?: string;
};

const useLogin = (params: LoginParams): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    return fetch(process.env.REACT_APP_API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default useLogin;
