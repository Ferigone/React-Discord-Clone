
const NoServer = () => {
  return (
    <div className="flex h-full w-full justify-center items-center flex-col">
      <h1 className="text-primary-text font-bold text-[30px]">
        No Server Selected
      </h1>
      <p className="text-primary-text">
        Select a server from the sidebar to view its channels
      </p>
    </div>
  );
};

export default NoServer;
