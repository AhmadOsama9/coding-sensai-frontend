const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <div className="loader border-t-4 border-primary w-12 h-12 rounded-full animate-spin mb-4"></div>
        <p className="text-muted text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
