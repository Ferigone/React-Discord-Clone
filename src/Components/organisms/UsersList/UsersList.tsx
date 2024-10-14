import { User } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectUsers } from "@store/reducers/serverSlice";

function UsersList() {
  const users = useSelector(selectUsers);
  return (
    <div className="list__container min-w-[240px] bg-primary ml-2">
      {users?.map((el: any) => (
        <div className="hover:bg-[#36393f] ml-2 rounded-md flex items-center py-2 font-semibold" key={el.userId}>
          <User
            avatarProps={{
              src: `https://placehold.co/200x200/000000/FFFFFF/png?font=roboto&text=${el.user.username[0]}`,
            }}
            name={
              <span className="font-semibold text-primary-text text-[15px]">{el.user.username}</span>
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
