import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./UsersList.css";

import {
  initUsers,
  modifyUser,
  selectUsers,
} from "../../store/reducers/onlineUsersSlice";

import db from "../../utils/firebase";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot: any) => {
        let users: Array<any> = [];
        querySnapshot.forEach((doc: any) => {
          users.push(doc.data());
        });
        dispatch(initUsers(users));
      });
    db.collection("users").onSnapshot((querySnapshot: any) => {
      querySnapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          // change.doc.data() Add User
        }
        if (change.type === "modified") {
          dispatch(modifyUser(change.doc.data()));
          //Change user data
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
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
