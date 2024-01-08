import axios from "axios";

export default axios.create({
  baseURL: "https://tutorialapp-4lgp.onrender.com/api/tutorials", //change to render link for deploy
  headers: {
    "Content-type": "application/json"
  }
});
