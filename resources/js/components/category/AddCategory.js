import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from '../Header'

export default function AddCategory() {

    const navigate = useNavigate();
    const intialValue = { category: " " };
    const [inputValue, setInputValue] = useState(intialValue);
    const [flag, setFlag] = useState(false);
    const {category} = inputValue;
    const handleChnage = (event) => {
         setInputValue({
             ...inputValue,
             [event.target.name]: event.target.value,
         });
    };
    const SubmitHandler = async (e) => { 
        e.preventDefault();          
            const value = { category};           
            let res = await axios
                .post("/api/addCategory", value)
                .then((result) => {
                    setInputValue(intialValue);
                    setFlag(true);
                    navigate("/category");
                })
                .catch((err) => {                    
                    console.log(err.response.data.errors);
                }); 
    };
    return (
        <>
        <Header/>
        <div className="container">
            <div style={{ paddingTop: "50px" }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {flag && <div className="alert alert-danger">
                        <strong>Danger!</strong> The category field is required </div>
                        }
                        <div className="card">
                            <div className="card-header">Create Category </div>
                            <div className="card-body">
                                <form onSubmit={SubmitHandler}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="ExampleInputName">
                                            Category Name
                                        </label>
                                        <input
                                            onChange={handleChnage}
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            id="category"
                                            aria-placeholder="Category"
                                            value={category}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}