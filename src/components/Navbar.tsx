import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [token, setToken] = useState<boolean>(false);
    useEffect(()=>{
        const userToken = localStorage.getItem('token')
        setToken(!!userToken)
    },[])
    const navigate = useNavigate()
    const onLogoutHandler = () => {
        localStorage.clear();
        navigate('/login')
    }
  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    {/* <Link to='recipes'>Recipe App</Link> */}
    {/* <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token ? <><li className="nav-item mx-2">
        <Link to='/recipes'>Recipe App</Link>
        </li>
        <li className="nav-item mx-2">
        <Link to='/recipes'>Home</Link>
        </li></> : <li className="nav-item mx-2">
        <Link to='/login'>Login</Link>
        </li>}
        <li className="nav-item mx-2">
        <Link to='/about'>About</Link>
        </li>
        <li className="nav-item mx-2">
            <Button onClick={onLogoutHandler}>Logout</Button>
        </li>
        
        
      </ul>
      
    </div>
  </div>
</nav>)
}

export default Navbar
