import { User } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../store/reducers/serverSlice";

function UsersList() {
  const users = useSelector(selectUsers);

  return (
    <div className="list__container min-w-[240px] bg-primary rounded-[20px] ml-2">
      {users?.map((el: any) => (
        <div className="hover:bg-[#36393f] ml-2 rounded-md flex items-center py-2 font-semibold">
          <User
            avatarProps={{
              src: `https://via.placeholder.com/150/000000/FFFFFF/?text=${el.username[0]}`,
            }}
            name={
              <span className="font-semibold text-[15px]">{el.username}</span>
            }
            description={`#${el.id.slice(0, 6).toUpperCase()}`}
            className="font-semibold"
          />
        </div>
      ))}
    </div>
  );
}

export default UsersList;
