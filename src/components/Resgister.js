import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";


function Resgister() {
    let history = useHistory();
    const [user, setUser] = useState({
        username: "",
        password: "",
        email : ""
    })

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post(`http://localhost:3001/api/v2/users/register`, user)
        .then(res => {
            console.log(res)
      
        }).catch(err => {
            console.log(err)
        });
        history.push("/login");
      };


    return (
        <div className="container w-150  justify-content-center">
        <div>Hello Register</div>
        <form className=""  onSubmit={e => onSubmit(e)}>
            <label>username</label>
           <input className="form-control"  name="username" value={user.username} onChange={e=>setUser({ ...user ,username : e.target.value})}></input>
           <label>password</label>
           <input type="password" className="form-control"   name="password" value={user.password}onChange={e=>setUser({ ...user ,password : e.target.value})}></input>
           <label>email</label>
           <input type="email" className="form-control"   name="email" value={user.email} onChange={e=>setUser({ ...user ,email : e.target.value})}></input>

           <button type="submit" className="btn btn-success mt-5 ">Register</button>
           
           <button className="btn btn-danger mt-5 ">Cancel</button>
        </form>
    </div>
    )
}

export default Resgister
