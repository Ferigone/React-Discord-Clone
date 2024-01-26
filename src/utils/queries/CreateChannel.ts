type Params = {
  name: string;
  server_id: string;
};

const CreateChannel = (params: Params) => {
  return new Promise((resolve, reject) => {
    return fetch(process.env.REACT_APP_API_URL + "/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
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

export default CreateChannel;
