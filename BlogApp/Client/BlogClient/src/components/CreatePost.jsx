import {useState  } from 'react'
import ReactQuill from 'react-quill';
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

const CreatePost = () => {

  const [value,setValue] =  useState('');
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [files,setFiles] = useState('');
  const [redirect,setredirect] = useState(false);

  async function handleSubmit(e){

    const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',value);
    data.set('files',files[0]);

    e.preventDefault();

    const response = await fetch('http://localhost:4000/createPost',{
      method:'POST',
      body:data,
      credentials:'include',
    })

    if(response.ok){
      alert('post created successfully');
      setredirect(true);
    }

  }

  if(redirect){
    return(
      <>
        <Navigate to={'/'} />
      </>
    )
  }


  return (
    <form action="" className="createPostForm" onSubmit={handleSubmit}>
      <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="text" placeholder='summary' value={summary} onChange={(e)=>setSummary(e.target.value)}/>
      <input type="file" onChange={(ev)=>setFiles(ev.target.files)}/>
      <ReactQuill theme="snow" value={value} onChange={newValue => setValue(newValue)} modules={modules} formats={formats} />
      <button type='submit'>Create Post</button>
    </form>
  )
}

export default CreatePost