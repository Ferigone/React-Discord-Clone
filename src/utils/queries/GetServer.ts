const GetServer = (server_id: String) => {
  return new Promise((resolve, reject) => {
    return fetch(import.meta.env.VITE_APP_API_URL + `/server?id=${server_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data.server);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default GetServer;
