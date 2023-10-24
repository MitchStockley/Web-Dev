import axios from "axios";

export default axios.create({
  baseURL: "https://tutorialsbackend.onrender.com/", //change to render link for deploy
  headers: {
    "Content-type": "application/json"
  }
});
