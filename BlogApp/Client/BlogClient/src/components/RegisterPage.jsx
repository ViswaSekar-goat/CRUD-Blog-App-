import {useState} from 'react'


const RegisterPage = () => {

  const [username , SetUsername] = useState('');
  const [password , SetPassword] = useState('');
  const [verifyPassword , setVerifyPassword] = useState('');

  async function handleSubmit(e){

    e.preventDefault();

    if(password !== verifyPassword){
      alert('passwords do not match')
      setVerifyPassword('')
      SetPassword('')
      return
    }

    const response = await fetch('http://localhost:4000/Register',{
      method:'POST',
      body: JSON.stringify({username,password,verifyPassword}),
      headers: {'Content-Type':'application/json'},
      credentials:'include'
    })

    if(response.status === 200){
      alert('registration successfull')
    } else {
      alert('registration failed')
    }
    SetUsername('');
    SetPassword('')
    setVerifyPassword('')
  }


  return (
    <>
    <div className="RegisterBody">
      <form action="" className="RegisterPage" onSubmit={handleSubmit}>
      <h1>Register</h1>
        <input
        placeholder="enter your name"
        type="text"
        value={username}
        onChange={(e)=>SetUsername(e.target.value)}
        required
        />

        <input  placeholder="enter your password"
        type="password"
        required
        value={password}
        onChange={(e)=>SetPassword(e.target.value)}
        />

        <input  placeholder="Re-enter your password"
        type="password"
        required
        value={verifyPassword}
        onChange={(e)=>setVerifyPassword(e.target.value)}
        />

        <button className="submitButton" type="submit">Submit</button>
      </form>
    </div>
    </>
  )
}

export default RegisterPage