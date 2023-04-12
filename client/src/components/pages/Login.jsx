import { Navigate } from "react-router-dom";
import Header from "./../Header"
import Login from "./../Login"


export default function LoginPage(){
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
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
                    />
                <Login/>
            </div>
        </div>
       
    )
}