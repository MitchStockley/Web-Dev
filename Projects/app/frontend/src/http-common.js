import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", //change to render link for deploy
  headers: {
    "Content-type": "application/json"
  }
});
