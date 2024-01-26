const GetChannelInfo = (server_id: string) => {
  return new Promise((resolve, reject) => {
    return fetch(
      process.env.REACT_APP_API_URL + `/channel?server=${server_id}`,
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
        resolve(data.channel);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default GetChannelInfo;
