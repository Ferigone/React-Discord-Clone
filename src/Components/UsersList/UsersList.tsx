import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./UsersList.css";

import {
  initUsers,
  modifyUser,
  selectUsers,
} from "../../store/reducers/onlineUsersSlice";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="list__container min-w-[240px]">
      {users?.map((el: any) => (
        <div className="list__usercard">
          <div className="list__usercard_photo_container">
            <img
              className="list__usercard_photo"
              src={el.userData.photo}
              alt=""
            />
            <span className={`list__usercard_status ${el.status}`} />
          </div>
          <span className="list__usercard_username">
            {el.userData.username}
          </span>
        </div>
      ))}
    </div>
  );
}

export default UsersList;
