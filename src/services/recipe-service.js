import axios from "axios";

class RecipeService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}/recipes`,
      withCredentials: true,
    });
  }
  list = () => {
    return this.service.get("/list");
  };
}

const recipeService = new RecipeService();
export default recipeService;
