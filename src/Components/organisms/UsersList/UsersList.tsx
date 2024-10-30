import { useSelector } from "react-redux";
import User from "@molecules/User";
import { selectServerMembers } from "@store/reducers/serverListSlice";
import { useParams } from "react-router-dom";

function UsersList() {
  const { server_id } = useParams();
  const users = useSelector(selectServerMembers(server_id));

  return (
    <div className="list__container min-w-[240px] bg-primary/50 ml-2 py-8">
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
