import axios from "axios";

const baseURL = "https://dog-breed-finder-server.herokuapp.com";

async function findByName (name) {
    const url = baseURL + "/api/breeds";
    const config = { params: { name: name} };

    return await axios.get(url, config);
}

export default findByName;
