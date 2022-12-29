import { ChangeEvent, FC, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
export interface Recipe {
  id: number;
  image: string;
  name: string;
  desc: string;
}
type Inputs = {
  name: string,
  img: string,
  desc: string,
};
const schema = yup.object({
  name: yup.string().required('Please enter name!'),
  img: yup.string().url('Please enter valid url!').required('Please enter website'),
  desc: yup.string().required('Please enter desc!')
}).required();
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
  const { register, handleSubmit, watch, formState: { errors }, setValue, resetField } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const [state, setState] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>(recipesData);
  const [editData, setEditData] = useState<Recipe | undefined>();

  const handleShow = () => setState(true);

  const handleClose = () => {
    setState(false);
    resetField('name'); 
    resetField('img'); 
    resetField('desc'); 
    clearForm();
  };

  const clearForm = () => {
    setEditData(undefined);
  };

  const getUniqueID = (): number => {
    return +(Date.now() + (Math.random() * 100000).toFixed());
  };

  const onEditHandler = (data: Recipe) => {
    const { name, image, desc } = data;
    setValue('name',name);
    setValue('img',image);
    setValue('desc',desc);
    setEditData(data);
    handleShow();
  };

  const deleteRecipeHandler = (id:number) => {
    setRecipes(recipes => recipes.filter(one=> one.id !== id))
  }

  const onSubmit: SubmitHandler<Inputs> = recipe => {
      if (editData) {
      const modifiedData = [...recipes];
      modifiedData.map((data: Recipe) => {
        if (data.id === editData.id) {
          data.id = editData.id;
          data.name = recipe.name;
          data.image = recipe.img;
          data.desc = recipe.desc;
        }
      });
      setRecipes(modifiedData);
    } else {
      const newRecipe: Recipe = {
        id: getUniqueID(),
        name : recipe.name,
        image: recipe.img,
        desc: recipe.desc,
      };
      setRecipes((recipes) => [...recipes, newRecipe]);
    }
    clearForm();
    setState(false);
  }
  return (
    <>
      <div className="text-center mb-3">
        <Button variant="primary" onClick={handleShow}>
          Add Recipe
        </Button>
      </div>
      <Modal show={state} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name")}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="pizza"
            />
            <p className="text-danger">{errors.name?.message}</p>

          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Image
            </label>
            <input
              type="text"
              {...register("img")}
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="img url"
            />
            <p className="text-danger">{errors.img?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              {...register("desc")}
              placeholder="Recipe Description."
            ></textarea>
            <p className="text-danger">{errors.desc?.message}</p>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
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
