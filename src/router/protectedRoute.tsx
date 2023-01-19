import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setUserData } from "../store/reducers/userSlice";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoute = ({ children }: any) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) {
   navigate("/login");
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(process.env.REACT_APP_API_URL + '/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  if(isLoading) return <div>Loading...</div>

  if(data){
    dispatch(setUserData(data.user))
  }



  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ProtectedRoute;
