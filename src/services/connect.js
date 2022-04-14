import axios from "axios";

const baseURL = "https://dog-breed-finder-server.herokuapp.com";

async function findByName (name) {
    const url = baseURL + "/api/breeds";
    const config = { params: { name: name} };

    return await axios.get(url, config);
}

async function findAll() {
    const url = baseURL + "/api/all";

    return await axios.get(url);
}

export { findByName, findAll };
