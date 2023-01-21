const GetServer = () => {
  return new Promise((resolve, reject) => {
    return fetch(process.env.REACT_APP_API_URL + "/servers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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

export default GetServer;