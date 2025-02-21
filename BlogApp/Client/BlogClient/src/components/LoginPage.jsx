import {useState , useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginPage = () => {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [redirect,setredirect] = useState(false)
  const {setUserInfo} = useContext(UserContext);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log('submit');

    const response = await fetch('http://localhost:4000/login',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      withCredentials:true
    })

    if(response.ok){
      response.json().then(data => {
        setUserInfo(data);
        setredirect(true);
      })
    } else if (response.status === 400){ 
      alert('unauthorized')
      setPassword('')
      return;
    } else {
      alert('user not found');
      return;
    }
    setPassword('')
    setUsername('')
  }

  if(redirect){
    return(
      <>
        <Navigate to={'/'}/>
      </>
    )
  }

  return (
    <div className="loginBody">
      <form action="" className="loginPage" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input placeholder="enter your name" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        <input  placeholder="enter your password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button className="submitButton" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginPage