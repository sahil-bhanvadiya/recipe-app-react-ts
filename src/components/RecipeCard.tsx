import { FC } from "react";
import { Recipe } from "./Main";
export const RecipeCard: FC<{
  recipe: Recipe;
  onEditHandler: (recipe: Recipe) => void;
}> = (props) => {
  const { recipe, onEditHandler } = props;

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
        </div>
      </div>
    </div>
  );
};
