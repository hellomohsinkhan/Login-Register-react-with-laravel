import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios  from 'axios';
import Header from '../Header'


export default function EditContact() {

    const navigate = useNavigate();
    const prams = useParams();
    const EditInitialInput = {category: " "};
    const [EditInputValue, setEditInitialInput] = useState(EditInitialInput);
    const {category} = EditInputValue;

    const edithandleChnage = (event) => {
        setEditInitialInput({
            ...EditInputValue,
            [event.target.name]: event.target.value,
        });
    };
    const editSubmitHandler = async (e) => {
        e.preventDefault();
        let id = prams.id;
        const value = {category};
           await axios.put(`/api/category/update/${id}`, value)
            .then((result) => {
                navigate("/category");
            });
    }

   async function edit() {
       let id = prams.id;
       let response = await axios.get(`/api/category/edit/${id}`)
       .then((res) => {
       	console.log(res)
          setEditInitialInput({             
              category: res.data.name,
          });
       });
   }

    useEffect(() =>{
        edit();
    },[])
    return (
        <>
        <Header/>
        <div className="container">
            <div style={{ paddingTop: "50px" }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">Update Category</div>
                            <div className="card-body">
                                <form onSubmit={editSubmitHandler}>                                    
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleInputcategory">
                                            Category
                                        </label>
                                        <input
                                            onChange={edithandleChnage}
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            id="category"
                                            placeholder="Enter your Category"
                                            value={category}
                                            required
                                        />
                                    </div>                                   
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>
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