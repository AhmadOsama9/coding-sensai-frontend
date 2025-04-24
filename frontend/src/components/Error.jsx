const ErrorMessage = ({ message = "Something went wrong. Please try again later." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14m-14.14 0L19.07 4.93" />
      </svg>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default ErrorMessage;
