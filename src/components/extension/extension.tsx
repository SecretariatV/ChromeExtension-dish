import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import { IconButton } from "../Buttons/IconButton";
// import { chrome } from "chrome";

const chrome: typeof globalThis.chrome = window.chrome;

const baseApi = "https://dish-extension.onrender.com";

export const Extention = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Recipe>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers["Access-Control-Allow-Methods"] =
      "GET,POST,OPTIONS,DELETE,PUT";
    axios.defaults.headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization, X-Requested-With";

    axios({
      method: "get",
      baseURL: `${baseApi}/recipes`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      setRecipes(response.data.message);
    });
  }, []);

  useEffect(() => {
    setSearchResult(recipes.find(({ name }) => name.includes(keyword)));
  }, [keyword]);

  const gotoFullPage = () => {
    chrome.tabs.create({ url: "https://dish-extension.netlify.app/full" });
  };
  return (
    <div className="board">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search cousine"
        />
        <div className="search-icon">
          <IconButton size={20} viewBox="0 0 20 20" name="Search" />
        </div>
      </div>
      {/* Dish & Link */}
      <div className="dish">
        <div className="dish-name">
          <IconButton size={24} viewBox="0 0 24 24" name="Spain" />
          <h1>{searchResult?.name}</h1>
        </div>
        <div className="link">
          <IconButton size={10} viewBox="0 0 10 10" name="Twitter" />
          <IconButton size={10} viewBox="0 0 10 10" name="Telegram" />
          <IconButton size={10} viewBox="0 0 10 10" name="Medium" />
          <IconButton size={10} viewBox="0 0 10 10" name="Language" />
        </div>
      </div>
      {/* Cooking Method */}
      <div className="method">
        <div className="body">
          <div className="title">
            <IconButton size={32} viewBox="0 0 32 32" name="Paella" />
            <h1>Difficulty: {searchResult?.difficulty}</h1>
          </div>
          <h1 className="description">{searchResult?.description}</h1>
          <button onClick={() => gotoFullPage()}>View Full Recipe</button>
        </div>
      </div>
      {/* Cooking Information */}
      {
        <div className="info">
          <div className="card">
            <div className="descript">
              <h1 className="title">Seafood</h1>
              <h2 className="nomal">{searchResult?.protein}</h2>
            </div>
            <div className="descript">
              <h1 className="title">Produce</h1>
              <div className="nomal flex-gap">
                <p className="green">{searchResult?.produce}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="descript">
              <h1 className="title">Spices</h1>
              <div className="nomal flex-gap">
                <p className="green">{searchResult?.spice}</p>
              </div>
            </div>
            <div className="descript">
              <h1 className="title">Olive Oil</h1>
              <h2 className="orange">{searchResult?.cookingOil}</h2>
            </div>
          </div>
          <div className="card">
            <div className="descript">
              <h1 className="title">Volume/Weight</h1>
              <h2 className="white">{searchResult?.volume}</h2>
            </div>
            <div className="descript">
              <h1 className="title">Serves</h1>
              <h2 className="white">{searchResult?.serves}</h2>
            </div>
          </div>
          <div className="card">
            <div className="descript">
              <h1 className="title">Authenticity</h1>
              <h2 className="orange">{searchResult?.authenticity}</h2>
            </div>
            <div className="descript">
              <h1 className="title">Stock</h1>
              <h2 className="orange">{searchResult?.stock}</h2>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
