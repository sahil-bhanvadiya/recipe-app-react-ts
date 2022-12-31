import "./App.css";
import Main from "./components/Main";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Register from "./components/Register";
import About from "./components/About";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/recipes" />
    },
    {
      path: "/login",
      element: <Register isLoginPage={true}/>
    },
    {
      path: "/register",
      element: <Register isLoginPage={false}/>,
    },
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/recipes",
      element: <Main/>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
