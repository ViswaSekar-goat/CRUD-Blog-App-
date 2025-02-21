/* eslint-disable no-unused-vars */
import Header from "./components/Header"
import Posts from "./components/Posts"
import { Routes , Route} from "react-router"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import { UserContext } from "./UserContext.js"
import { UserContextProvider } from "./UserContext.jsx"
import CreatePost from "./components/CreatePost"
import {useEffect , useState} from "react"
import SinglePost from "./components/SinglePost"
import EditPage from "./components/EditPage"

function App() {

  const [data,setData] = useState('');

  useEffect(()=>{
    async function getData(){
      const response = await fetch('http://localhost:4000/posts',{credentials:'include'});
      const dataRecieved = await response.json();
      setData(dataRecieved);
    }

    getData();
    
  },[data])

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              {data.length!=0 && data.map((posts,index)=>(
                <Posts {...posts} key={index}/>
              ))}
            </main>
          </>
        }/>
        <Route path="/login" element={
          <>
            <Header />
            <LoginPage/>
          </>
        }/>
        <Route path="/Register" element={
          <>
            <Header />
            <RegisterPage/>
          </>
        }/>
        <Route path="/create" element={
          <>
          <Header/>
          <CreatePost/>
          </>
        }/>
        <Route path="/posts/:id" element={
          <>
          <Header/>
          <SinglePost />
          </>
        }/>
        <Route path="/editPage/:id"  element={<EditPage/>}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
