export const RecipeCard = (props: any) => {
  const { recipe } = props;

  return (
    <div className="col">
      <div className="card h-100">
        <img className="card-img-top" src={recipe.image} alt={recipe.name} />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text">{recipe.desc}</p>
          <a href="#" className="btn btn-primary">
            Download
          </a>
        </div>
        <div className="card-footer">
            <small className="text-muted">Ingredients Here</small>
        </div>
      </div>
    </div>
  );
};
