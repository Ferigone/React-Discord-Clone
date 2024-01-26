const GetMessages = (channel_id: string | undefined, message_index: number): any => {
    return new Promise((resolve, reject) => {
      return fetch(
        process.env.REACT_APP_API_URL + `/channel/${channel_id}/messages?limit=50${message_index > 0 ? `&before=${message_index}` : ""}`,
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
          resolve(data.messages);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  export default GetMessages;
  