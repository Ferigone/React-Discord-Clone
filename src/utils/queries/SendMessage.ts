const SendMessage = (message: string, channelId: string) => {
  return new Promise((resolve, reject) => {
    return fetch(process.env.REACT_APP_API_URL + "/channel/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        message,
        channel_id: channelId,
      }),
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

export default SendMessage;
