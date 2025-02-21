import {useState , useEffect} from 'react'
import ReactQuill from 'react-quill';
import {useParams} from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import '../index.css';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];


const EditPage = () => {  
  const {id} = useParams();
  const [data,setData] = useState({});
  const [title,setTitle] = useState(null);
  const [summary,setSummary] = useState(null);
  const [value,setValue] = useState("");
  const [files,setFiles] = useState(null);
  const handleSubmit = async (e) =>{
    const Data = new FormData();
    Data.set('title',title);
    Data.set('summary',summary);
    Data.set('content',value);
    Data.set('files',files[0]);

    e.preventDefault();

    const response = await fetch(`http://localhost:4000/posts/${id}`,{
      method:'PUT',
      body:Data,
      credentials:'include',
    })

    if(response.ok){
      Navigate('/');
    }

  }

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch(`http://localhost:4000/posts/${id}`,{credentials:'include'});
      const data = await response.json();
      console.log(data);
      setData(data);
    }

    fetchData();

  },[])

  return (
    <form action="" className="createPostForm" onSubmit={handleSubmit}>
      <input type="text" placeholder='Title' defaultValue={title || data.title} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="text" placeholder='summary' defaultValue={summary || data.summary} onChange={(e)=>setSummary(e.target.value)}/>
      <input type="file" onChange={(ev)=>setFiles(ev.target.files)}/>
      <ReactQuill theme="snow" value={data.content} onChange={newValue => setValue(newValue)} modules={modules} formats={formats} />
      <button type='submit'>Create Post</button>
    </form>
  )
}

export default EditPage








