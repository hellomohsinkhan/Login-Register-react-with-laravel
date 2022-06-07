import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login(){

    let message = localStorage.getItem('success');
    localStorage.removeItem('success');

    const [user, setUser] = useState({
        email: "",
        password:""
    });
    const {email,password} = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };   
    const navigate = useNavigate();
    const[errors,setErrors] = useState([]);

    async function signin(e){
        e.preventDefault();     
        let result = await axios.post("http://localhost:8000/api/login",user)        
            .then((result) => {   
                if(result.data.success == false){
                    setErrors(result.data.message); 
                }else{
                    localStorage.setItem('token', result.data.token);
                    navigate("/category");
                }                 
            })
            .catch((err) => {   
                // console.log(err.message)     
                // setErrors( arr => [...arr, err.data.message]);  
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
                        {   message ?
                            <div className="alert alert-info" role="alert">
                            {message}
                        </div>
                        :''
                        }     
                            <div className="card-header">Login </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email" value={email} onChange={e => onInputChange(e)} 
                                            id="email"
                                            aria-placeholder="email"                                            
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password" value={password} onChange={e => onInputChange(e)} 
                                            id="password"
                                            aria-placeholder="Password"                                            
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={signin}>Login</button>
                                    <Link to={`/register/`} >
                                        New User Register here
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

export default Login;