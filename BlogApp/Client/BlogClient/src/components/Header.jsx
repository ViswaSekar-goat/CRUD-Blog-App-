import {Link} from 'react-router-dom'
import {useEffect  , useContext } from 'react'
import { UserContext } from '../UserContext';

const Header = () => {

  const {setUserInfo , userInfo} = useContext(UserContext);

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch('http://localhost:4000/profile',{credentials:'include' , withCredentials:true});
      const data = await response.json();
      setUserInfo(data);
    }

    fetchData();

  } , [setUserInfo])

  async function handleLogout(){
    await fetch('http://localhost:4000/logout' ,
    {credentials:'include', 
    withCredentials:true,
    method:'POST'
    });

    setUserInfo(null);

  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="Logo">MyBlog</Link>
      <div className="refLink">
        {username && (
          <>
            <Link to='/create'>Create Post</Link>
            <a onClick={handleLogout}>Logout</a>
          </>
        )}

        {!username && (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header