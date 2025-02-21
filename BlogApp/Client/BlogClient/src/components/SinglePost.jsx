import {useParams} from "react-router-dom"
import {useEffect , useState , useContext} from "react"
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

const SinglePost = () => {
  const {id} = useParams();
  const {userInfo} = useContext(UserContext);
  const [info,setInfo] = useState({});
  // console.log(userInfo);
  useEffect(()=>{
    async function getData(){
      try{
        const response = await fetch(`http://localhost:4000/posts/${id}`,{credentials:'include'});
        const data = await response.json();
        if(data.author._id == userInfo.id){
          console.log(data._id);
        }
        setInfo(data);
      } catch(err){
        console.log(err);
      }
      // console.log(info.author._id);
      // console.log(userInfo.id)
    }
    getData();
    

  },[id]);

  if (!info.author) return <h1>Loading</h1>;

  return (
    <>
        {userInfo.id == info.author._id && (
          <Link to={`/editPage/${info._id}`}>Edit this page</Link>
          
        )}
        <div className="imageSinglePost"><img src={`http://localhost:4000/${info.cover}`} alt="" />
        <div className="details">
          <h1 className="titleInPost">{info.title}</h1>
          <p>{info.createdAt}</p>
          <p>{info.summary}</p>
        </div>
      </div>
      <div className="contentDiv" dangerouslySetInnerHTML={{__html:info.content}} />
    </>
  )
}

export default SinglePost