import { ChangeEvent, FC, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export interface Recipe {
  id: number;
  image: string;
  name: string;
  desc: string;
}
const recipesData: Recipe[] = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/aloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent_466689-76186.jpg?size=626&ext=jpg",
    name: "Aalu Paratha",
    desc: "Aloo Paratha are popular Indian flatbreads stuffed with a delicious spiced potato mixture.",
  },
  {
    id: 2,
    image: "https://thumbs.dreamstime.com/b/bhel-puri-23902772.jpg",
    name: "Bhel",
    desc: "Bhelpuri is a savoury snack originating from India, and is also a type of chaat. It is made of puffed rice, vegetables and a tangy tamarind sauce, and has a crunchy texture.",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg",
    name: "Pizza",
    desc: "Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese.",
  },
];
const Main: FC = () => {
  const [state, setState] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>(recipesData);
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [editData, setEditData] = useState<Recipe | undefined>();

  const handleShow = () => setState(true);

  const handleClose = () => {
    setState(false);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setImg("");
    setDesc("");
    setEditData(undefined);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "img":
        setImg(e.target.value);
        break;
      case "description":
        setDesc(e.target.value);
        break;
    }
  };

  const getUniqueID = (): number => {
    return +(Date.now() + (Math.random() * 100000).toFixed());
  };

  const handleSave = () => {
    if (editData) {
      const modifiedData = [...recipes];
      modifiedData.map((data: Recipe) => {
        if (data.id === editData.id) {
          data.id = editData.id;
          data.name = name;
          data.image = img;
          data.desc = desc;
        }
      });
      setRecipes(modifiedData);
    } else {
      const newRecipe: Recipe = {
        id: getUniqueID(),
        name,
        image: img,
        desc,
      };
      setRecipes((recipes) => [...recipes, newRecipe]);
    }
    clearForm();
    setState(false);
  };

  const onEditHandler = (data: Recipe) => {
    const { name, image, desc } = data;
    setEditData(data);
    setName(name);
    setImg(image);
    setDesc(desc);
    handleShow();
  };

  const deleteRecipeHandler = (id:number) => {
    setRecipes(recipes => recipes.filter(one=> one.id !== id))
  }
  
  return (
    <>
      <div className="text-center mb-3">
        <Button variant="primary" onClick={handleShow}>
          Add Recipe
        </Button>
      </div>
      <Modal show={state} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit" : "Add"} Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Recipe Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChangeHandler}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="pizza"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Image
            </label>
            <input
              type="text"
              name="img"
              value={img}
              className="form-control"
              onChange={onChangeHandler}
              id="exampleFormControlInput2"
              placeholder="img url"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              value={desc}
              onChange={onChangeHandler}
              placeholder="Recipe Description."
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEditHandler={onEditHandler}
            deleteRecipeHandler={deleteRecipeHandler}
          ></RecipeCard>
        ))}
      </div>
    </>
  );
};

export default Main;
