type LoginParams = {
  email: string;
  password: string;
};

const useLogin = (params: LoginParams) => {
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
