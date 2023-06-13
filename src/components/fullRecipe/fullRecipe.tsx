import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import { IconButton } from "../Buttons/IconButton";

const baseApi = "https://dish-extension.onrender.com";

export const FullRecipe = () => {
  const pages = 10;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe>();
  const [lists, setLists] = useState<Recipe[]>([]);
  const [count, setCount] = useState<number>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);

  // Get Recipes Count
  useEffect(() => {
    axios({
      method: "get",
      baseURL: `${baseApi}/number`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      setCount(response.data.message);
    });
  }, []);

  // Get All Recipes
  useEffect(() => {
    axios({
      method: "get",
      baseURL: `${baseApi}/recipes`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      setRecipes(response.data.message);
      setLists(response.data.message.slice(0, pages));
    });
  }, [count]);

  // Get Current Recipe
  const getRecipe = (id: number) => {
    axios({
      method: "post",
      baseURL: `${baseApi}/recipes`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        id: id,
      },
    }).then((response) => {
      setRecipe(response.data.message);
    });
  };

  // Save data in database sand update data.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios({
      method: "post",
      baseURL: `${baseApi}/recipes`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name: (document.getElementById("name") as HTMLInputElement).value,
        origin: (document.getElementById("origin") as HTMLInputElement).value,
        protein: (document.getElementById("seafood") as HTMLInputElement).value,
        produce: (document.getElementById("produce") as HTMLInputElement).value,
        spice: (document.getElementById("spices") as HTMLInputElement).value,
        cookingOil: (document.getElementById("oil") as HTMLInputElement).value,
        volume: parseInt(
          (document.getElementById("volume") as HTMLInputElement).value
        ),
        serves: parseInt(
          (document.getElementById("serves") as HTMLInputElement).value
        ),
        authenticity: (document.getElementById("auth") as HTMLInputElement)
          .value,
        stock: (document.getElementById("stock") as HTMLInputElement).value,
        difficulty: parseInt(
          (document.getElementById("difficulty") as HTMLInputElement).value
        ),
        description: (
          document.getElementById("description") as HTMLInputElement
        ).value,
      },
    }).then((response) => {
      setCount((prev) => (prev ? prev + 1 : 1));
      setIsOpen(false);
    });
  };

  // Pagenation
  useEffect(() => {
    setLists(recipes.slice(pageNumber * pages, (pageNumber + 1) * pages));
  }, [pageNumber]);

  return (
    <div className="full">
      <div className="dish-panel">
        <div className="body">
          {/* Header */}
          <div className="add-button">
            <h2 style={{ display: "flex", color: "white", gap: "8px" }}>
              Total: <p>{count}</p>
            </h2>
            <IconButton
              size={20}
              viewBox="0 0 16 16"
              name="Plus"
              onClick={() => setIsOpen(true)}
            />
          </div>
          {/* Body */}
          <div style={{ position: "relative", height: "100%", margin: "16px" }}>
            <div className="panel">
              <div className="left-list">
                <div className="list">
                  {lists.map((recipe, id) => (
                    <button key={id} onClick={() => getRecipe(id)}>
                      {recipe.name}
                    </button>
                  ))}
                </div>
                <div className="pagenation-container">
                  <div className="pagenation">
                    <IconButton
                      size={16}
                      viewBox="0 0 24 24"
                      name="ArrowLeft"
                      onClick={() =>
                        setPageNumber((prev) =>
                          prev >= 1 && (prev - 1) * pages >= 0 ? prev - 1 : prev
                        )
                      }
                    />
                    <IconButton
                      size={16}
                      viewBox="0 0 24 24"
                      name="ArrowRight"
                      onClick={() =>
                        setPageNumber((prev) =>
                          prev === 0 || (count ? count : 0) > (prev + 1) * pages
                            ? prev + 1
                            : prev
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="right-description">
                {recipe && (
                  <>
                    <img src="img/Spanish Paella.jpg" alt="Spanish Paella" />
                    <div className="description">
                      <h2 style={{ display: "flex", gap: "6px" }}>
                        Difficulty:<p>{recipe.difficulty}</p>
                      </h2>
                      <h4 style={{ display: "flex", gap: "6px" }}>
                        {recipe.description}
                      </h4>
                    </div>
                    <div className="information">
                      <div className="info-row">
                        <div className="full-info">
                          <h2>Seafood</h2>
                          <h3>{recipe.protein}</h3>
                        </div>
                        <div className="full-info">
                          <h2>Produce</h2>
                          <h3>{recipe.produce}</h3>
                        </div>
                      </div>
                      <div className="info-row">
                        <div className="full-info">
                          <h2>Spices</h2>
                          <h3>{recipe.spice}</h3>
                        </div>
                        <div className="full-info">
                          <h2>Olive Oil</h2>
                          <h3>{recipe.cookingOil}</h3>
                        </div>
                      </div>
                      <div className="info-row">
                        <div className="full-info">
                          <h2>Volume/Weight</h2>
                          <h3>{recipe.volume}</h3>
                        </div>
                        <div className="full-info">
                          <h2>Serves</h2>
                          <h3>{recipe.serves}</h3>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="footer-icons">
            <div className="link">
              <IconButton size={20} viewBox="0 0 10 10" name="Twitter" />
              <IconButton size={20} viewBox="0 0 10 10" name="Telegram" />
              <IconButton size={20} viewBox="0 0 10 10" name="Medium" />
              <IconButton size={20} viewBox="0 0 10 10" name="Language" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="modal">
            <div className="modal-container">
              <div className="modal-header">
                <IconButton
                  size={20}
                  viewBox="0 0 24 24"
                  name="Close"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <form className="modal-body" onSubmit={(e) => handleSubmit(e)}>
                <div className="info-col">
                  <div className="col">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                  </div>
                  <div className="col">
                    <label htmlFor="difficulty">Difficulty:</label>
                    <input
                      type="number"
                      id="difficulty"
                      name="difficulty"
                      min={0}
                    />
                  </div>
                </div>
                <div className="info-col">
                  <div className="col">
                    <label htmlFor="origin">Origin:</label>
                    <input type="text" id="origin" name="origin" required />
                  </div>
                  <div className="col">
                    <label htmlFor="seafood">Seafood:</label>
                    <input type="text" id="seafood" name="seafood" required />
                  </div>
                </div>
                <div className="info-col">
                  <div className="col">
                    <label htmlFor="produce">Produce:</label>
                    <input type="text" id="produce" name="produce" />
                  </div>
                  <div className="col">
                    <label htmlFor="spices">Spices:</label>
                    <input type="text" id="spices" name="spices" />
                  </div>
                </div>
                <div className="info-col">
                  <div className="col">
                    <label htmlFor="oil">Olive Oil:</label>
                    <input type="text" id="oil" name="oil" />
                  </div>
                  <div className="col">
                    <label htmlFor="volume">Volume /Weight:</label>
                    <input type="number" id="volume" name="volume" min={0} />
                  </div>
                </div>
                <div className="info-col">
                  <div className="col">
                    <label htmlFor="serves">Serves:</label>
                    <input type="number" id="serves" name="serves" min={0} />
                  </div>
                  <div className="col">
                    <label htmlFor="auth">Authenticity:</label>
                    <input type="text" id="auth" name="auth" />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="stock">Stock:</label>
                  <input type="text" id="stock" name="stock" />
                </div>
                <div className="col descript">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    cols={50}
                  />
                </div>
                <div className="modal-footer">
                  <button onClick={() => setIsOpen(false)}>Close</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
