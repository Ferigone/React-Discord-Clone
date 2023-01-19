type Params = {
    name: string;
}

const CreateServer = (params: Params) =>{
    return new Promise((resolve, reject) => {
        return fetch(process.env.REACT_APP_API_URL + "/servers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
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
}

export default CreateServer