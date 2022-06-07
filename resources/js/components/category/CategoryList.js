import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Header from '../Header'

function CategoryList(props) {
    console.log(props)
    const [category, setCategory] = useState([]);  
    const navigate = useNavigate();
    async function fetchData() {     
        await axios.get("/api/category").then((res) => {
            setCategory(...category, res.data);
        });
    }

    const deleteCategory = async (i, id) => {
        let yes = confirm("Are you want to delete this item?");
        if (yes === true) {
            const res = await axios.delete(`/api/category/delete/${id}`).then((res) => {
                console.log(res.data);
            });
            const newData = category;
            newData.splice(i, 1);
            setCategory(newData);
            navigate("/category")
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Header/>
        <div className="container mt-3">
        <div className="float-end mt-2">
          <Link className="btn btn-primary" to="/addCategory">Add</Link>
        </div>
        <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>SN</th>
            <th>Category Name</th>
            <th>Created By</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.created_by}</td>
                                        <td>{data.created_at}</td>                                        
                                        <td> 
                                        <Link
                                                to={`/editCat/${data.id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                               Edit
                                            </Link>
                                          <button className='btn btn-danger btn-sm' onClick={() => {
                                                    deleteCategory(i, data.id);
                                                }}>
                                                Delete
                                            </button>
                                            
                                        </td>                                        
                                    </tr>
                                );
                            })}
        </tbody>
      </table>
    </div>
    </>
    );
}

export default CategoryList;