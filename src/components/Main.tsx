import { ChangeEvent, FC, useState } from "react"
import { RecipeCard } from "./RecipeCard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface Recipe {
  id: number,
  image : string,
  name: string,
  desc : string
}
const recipesData: Recipe[] = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/aloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent_466689-76186.jpg?size=626&ext=jpg",
    name: 'Aalu Paratha',
    desc: 'Aalu paratha is very good.'
  },
  {
    id: 2,
    image: "https://thumbs.dreamstime.com/b/bhel-puri-23902772.jpg",
    name: 'Bhel',
    desc: 'Bhelpuri is a savoury snack originating from India, and is also a type of chaat. It is made of puffed rice, vegetables and a tangy tamarind sauce, and has a crunchy texture.',
  }
];
const Main: FC = () => {
  const [state, setState] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<Recipe[]>(recipesData)
  const [name, setName] = useState<string>('');
  const handleClose = () => {
    console.log(name);
    
    setState(false);
  }
  const handleShow = () => setState(true);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  } 
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={state} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
              className="form-control"
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
              placeholder='Recipe Description.'
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <>
            <RecipeCard recipe={recipe}></RecipeCard>
          </>
        ))}
      </div>
    </>
  );
}

export default Main
