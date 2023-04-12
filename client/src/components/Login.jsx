import { useContext, useState } from 'react';
import { loginFields } from "./constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();
    const [token,setToken] = useContext(AuthContext);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }
    

    //Handle Login API Integration here
    const authenticateUser = async () =>{
        
     
        let loginFields={
                 email:loginState['email-address'],
                 password:loginState['password']
         };

         try {
            const response = await axios.post('http://localhost:5000/auth/login',loginFields);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token)
            console.log('success');
            navigate("/");
          } catch (err) {
            console.log(err);
          } 
         }
    

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}