import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import CategoryList from './category/CategoryList'
import  AddCategory  from './category/AddCategory'
import  EditCategory  from './category/EditCat'
import  Login  from './auth/Login'
import  Registration  from './auth/Registration'
import PrivateRoute from './PrivateRoute';

class App extends Component {

 

  render () {
    return (
      <BrowserRouter>
         
          <Routes>        
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Registration/>}/> 

            <Route exact path='/' element={<PrivateRoute/>} >
              <Route exact path='/category' element={<CategoryList/>}/>
              <Route exact path='/addCategory' element={<AddCategory/>}/>
              <Route exact path='/editCat/:id' element={<EditCategory/>}/>
            </Route>
          </Routes> 
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

