import dayjs from "dayjs";

function Message({
  user,
  timestamp,
  message,
}: {
  user: any;
  timestamp: Date;
  message: string;
}) {

  const isSameDay = () => {
    return dayjs(timestamp).format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY");
  }

  return (
    <div className="message flex items-center p-3 px-8 transition-colors duration-250 text-white w-full break-words relative hover:bg-gray-700">
      <div className="flex h-full">
        <img
          className="w-10 h-10 rounded-full"
          src={`https://via.placeholder.com/200/000000/FFFFFF/?text=${user.username[0]}`}
        />
      </div>
      <div className="block break-all ml-5">
        <h5 className="flex items-baseline">
          <span className="font-semibold">{user.username}</span>
          <span className="text-primary-text ml-3 text-xs">
            {dayjs(timestamp).format(isSameDay() ? "HH:mm" : "DD-MM-YYYY HH:mm")}
          </span>
        </h5>
        <h4
          className="relative break-words font-light"
          dangerouslySetInnerHTML={{
            __html: unescape(message.replace(/\n/g, "<br />")),
          }}
        ></h4>
      </div>
    </div>
  );
}

export default Message;
