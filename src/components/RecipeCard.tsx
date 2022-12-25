import { FC } from "react";
import { Recipe } from "./Main";
export const RecipeCard: FC<{
  recipe: Recipe;
  onEditHandler: (recipe: Recipe) => void;
  deleteRecipeHandler: (id: number) => void;
}> = (props) => {
  const { recipe, onEditHandler, deleteRecipeHandler } = props;

  return (
    <div className="col">
      <div className="card h-100">
        <img className="card-img-top" src={recipe.image} alt={recipe.name} />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text">{recipe.desc}</p>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary"
            onClick={() => onEditHandler(recipe)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteRecipeHandler(recipe.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
