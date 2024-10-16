import { useSelector } from "react-redux";
import { selectUsers } from "@store/reducers/serverSlice";
import { Avatar } from "@nextui-org/react";
import User from "@molecules/User";

function UsersList() {
  const users = useSelector(selectUsers);

  return (
    <div className="list__container min-w-[240px] bg-primary ml-2 py-8">
      {users?.map((el: any) => (
        <div
          className="hover:bg-[#36393f] ml-2 rounded-md flex items-center py-2 font-semibold"
          key={el.userId}
        >
          <User user={el?.user} />
        </div>
      ))}
    </div>
  );
}

export default UsersList;
