import { Navigate } from "react-router-dom";
import Header from "./../Header";
import Signup from "./../Signup";

export default function SignupPage(){
    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        try {
          if(token!== null)
            return true;
        } catch (error) {
          return false;
        }
      };
    return(
        isAuthenticated() ? <Navigate to={'/'}/>:
        <div className="flex gap-2 justify-center items-center mt-6">
             <div>
                <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
                />
                <Signup/>
            </div>
        </div>
    )
}