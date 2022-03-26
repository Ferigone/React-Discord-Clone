import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./UsersList.css";

import { initUsers, modifyUser, selectUsers } from "../../store/reducers/onlineUsersSlice";
import firebase from 'firebase'

import db from "../../utils/firebase";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data())
        });
        dispatch(initUsers(users));
      });
      db.collection('users').onSnapshot(querySnapshot=>{
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // change.doc.data() Add User
          }
          if (change.type === 'modified') {
            dispatch(modifyUser(change.doc.data()))
            //Change user data
          }
          if (change.type === 'removed') {
            console.log('Removed city: ', change.doc.data());
          }
    
        })
      })
  }, [dispatch]);

  return (
    <div className="list__container">
      {users.map((el) => (
        <div className="list__usercard">
          <div className="list__usercard_photo_container">
            <img
              className="list__usercard_photo"
              src={el.userData.photo}
              alt=""
            />
            <span className={`list__usercard_status ${el.status}`}/>
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