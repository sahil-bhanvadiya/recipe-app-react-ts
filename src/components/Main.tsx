import { ChangeEvent, FC, useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
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

const Main: FC = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue, resetField } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const [state, setState] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any>([]);
  const [editData, setEditData] = useState<any>();
  const getRecipes = async() => {
    const recipes = await axios.get(`${process.env.REACT_APP_SECRET_NAME}/v1/recipe/list`)
    setRecipes(recipes.data);
  }
  useEffect(()=>{
    getRecipes();
  },[])
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

  const onEditHandler = (data: any) => {
    const { name, imgUrl, description } = data;
    console.log(data);
    
    setValue('name',name);
    setValue('img',imgUrl);
    setValue('desc',description);
    setEditData(data);
    handleShow();
  };

  const deleteRecipeHandler = async(id:number) => {
    //delete api call
    const response = await axios.delete(`${process.env.REACT_APP_SECRET_NAME}/v1/recipe/${id}`)
    if(response){
      getRecipes();
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async(recipe) => {
      if (editData) {
      const response = await axios.put(`${process.env.REACT_APP_SECRET_NAME}/v1/recipe/${editData._id}`,recipe)
      if(response){
        getRecipes();
      }
    } else {
      const body = {
        name : recipe.name,
        desc : recipe.desc,
        img : recipe.img,
      }
      const response = await axios.post(`${process.env.REACT_APP_SECRET_NAME}/v1/recipe/create`,body)
    }
    clearForm();
    setState(false);
  }
  return (
    <>
    <Navbar/>
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
        {recipes.length && recipes.map((recipe:any) => (
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
