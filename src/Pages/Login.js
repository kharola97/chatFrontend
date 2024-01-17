import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../Assets/logo.jpg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import "../index.css"
import { loginRoute } from '../Utils/APIRoutes';

function Login() {

  const navigate = useNavigate()
    const [values , setValues]  =  useState({
      username:"",
      email:"",
    })

    const toastoption = {
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
    }
    useEffect(()=>{
      if(localStorage.getItem("chat-app-user")){
        navigate("/")
      }
    },[])
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (handleValidations()) {
        const { username, password } = values;
    
        try {
          const { data } = await axios.post(loginRoute, {
            username,
            password,
          });
    
          if (data.status === false) {
            toast.error(data.message, toastoption);
          } else if (data.status === true) {
            localStorage.setItem("chat-app-user", JSON.stringify(data.userCheck));
           
            navigate("/");
          }
        } catch (error) {
          // Check for specific status code 400
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message, toastoption);
          } 
        }
      }
    };

    const handleValidations= ()=>{
      const {username,  password, } = values;
      
      
      if(!password){
       
        toast.error("password is required", toastoption) 
        return false;
      }
    else if(!username){
      toast.error("username is required", toastoption) 
      return false;
    }
   
    return true;
    }

    const handleChange = (event)=>{
      setValues({...values,[event.target.name]:event.target.value})
    }
  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>

            <div className='brand'>
               <img src={Logo} alt='Logo'/>
                 <h1>snappy</h1>
           </div>
   <input type='text' placeholder='username' name='username' onChange={(e)=>handleChange(e)} min="5" />

   

   <input type='password' placeholder='password' name='password' onChange={(e)=>handleChange(e)}/>

   

   <button type='submit'>Login </button>
   <span>Dont have an account?  <Link to="/register">register</Link> </span>
        </form>

    </FormContainer>
    <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction: column;
  justify-content:center;
  gap: 1rem;
  align-items : center;
  background-color : #131324;
  .brand{
    display:flex;
    align-items : center;
    gap : 1rem;
    justify-content: center;
    img {
      height : 5rem;
    }
    h1{
      color : white;
      text-transform : uppercase;
    }
  }
  form{
    display : flex;
    flex-direction: column;
    gap : 2rem;
    background-color : #00000076;
    border-radius: 2rem;
    padding : 3rem 5rem;
    input{
      background-color : transparent;
      padding : 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size:1rem;
      &:focus{
        border:0.1rem solid #997af0;
        outline : none;
      }


    }
    button{
      background-color : #997af0;
      color : white;
      padding : 1rem 2rem;
      border : none;
      font-weight : bold;
      cursor : pointer;
      border-radius : 0.4rem;
      font-size : 1rem;
      text-transform : uppercase;
      transition : 0.4s ease-in-out;
      &:hover{
        background-color: #4e0eff;

      }
    }
    span {
      color:white;
      text-transform : uppercase;
      a{
        color : #4e0eff;
        text-decoration : none;
        font-weight : bold;

      }
    }
  }

`;
export default Login;