import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'


function Login() {
    let history = useHistory();
    const [token, setToken] = useState("")
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post(`http://localhost:3001/api/v2/users/login`, user)
        .then(res => {
            console.log(res);
            localStorage.setItem("token",res.data.token); 
            //history.push("/profile");
            setToken(res.data.token);
      
        }).catch(err => {
            console.log(err)
        });
     
      };



      const isAuth =() =>{
          axios.get('http://localhost:3001/api/v2/login_in',{
            headers : {
                  "x-access-token" : localStorage.getItem("token"),
              },
          }).then((res)=>{
              console.log(res);
          })
      }

      
      const Logout =() =>{
        axios.get('http://localhost:3001/api/v2/logout').then((res)=>{
            localStorage.clear();
            console.log(res);
        })
    }


      useEffect(() => {
        
      }, []);

    return (
        <div className="container w-150  justify-content-center">
            <label>username :  {user.username}</label>
            <label>password :  {user.password}</label>
            <label>token :  {token}</label>
            <form className=""  onSubmit={e => onSubmit(e)}>
                <label>username</label>
                <input className="form-control" name="username" value={user.username} onChange={e=>setUser({ ...user ,username : e.target.value})}></input>
                <label>password</label>
                <input type="password" className="form-control"  name="username" value={user.password}  onChange={e=>setUser({...user ,password : e.target.value})}></input>

                <button type="submit" className="btn btn-primary">Login</button>

                <button className="btn btn-danger">Cancel</button>
            </form>
            <button onClick={Logout} className="btn btn-info">Logout</button>
            <button onClick={isAuth} className="btn btn-info">isAuth</button>
        </div>
    )
}

export default Login
