import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    try {
      if(token!== null)
        return true;
    } catch (error) {
      return false;
    }
  };

  return (props) =>
    isAuthenticated() ? <Component {...props} /> : <Navigate to="/login" />;
};

export default withAuth;