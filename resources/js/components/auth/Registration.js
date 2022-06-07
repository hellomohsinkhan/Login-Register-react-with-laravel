import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Registration(){

    const[errors,setErrors] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password:""
      });
      const {name, email,password} = user;
      const navigate = useNavigate();
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
   async function  signup(e)
       {
       e.preventDefault();     
        let result = await axios.post("http://localhost:8000/api/register",user)
            .then((result) => {    
                if(result.data.status == false){
                    setErrors(result.data.message); 
                    console.log(result.data.message);
                }else{
                    setUser({name:"",email:"",password:""}) // To Clear all fields
                    localStorage.setItem('success', result.data.message);
                    navigate("/login");
                }                 
            })
            .catch((err) => {       
                setErrors( arr => [...arr, result.data.message]);          
                console.log(err.response);
            });         
 
        }  

    return(
      <div className="container">
            <div style={{ paddingTop: "50px" }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">                       
                        <div className="card">

                        {   errors &&   
                            errors.length  ?
                            <div className="alert alert-danger" role="alert"><ul>
                            {errors.map((item,index) => 
                                <li key={index}>{item}</li>
                            )}
                            </ul>
                        </div>
                        :''
                        }     
                       
                        <div className="card-header">Registration </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control" value={name} onChange={e => onInputChange(e)} 
                                            name="name"
                                            id="name"
                                            aria-placeholder="Name"                                            
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control" value={email} onChange={e => onInputChange(e)} 
                                            name="email"
                                            id="email"
                                            aria-placeholder="Email"                                            
                                            required
                                        />
                                    </div>   
                                    <div className="form-group mb-3">
                                        <label>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control" value={password} onChange={e => onInputChange(e)} 
                                            name="password"
                                            id="password"
                                            aria-placeholder="Password"                                            
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={signup}>Submit</button>
                                    <Link to={`/login/`} >
                                        Login
                                    </Link>    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )       
}

export default Registration;