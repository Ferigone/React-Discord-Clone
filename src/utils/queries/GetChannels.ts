const GetChannels = (server_id: string | undefined) => {
  return new Promise((resolve, reject) => {
    return fetch(
      import.meta.env.VITE_APP_API_URL + `/channels?server=${server_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data.channels);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default GetChannels;
