const ErrorMsg = ({ errorMsg, getPosts }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className="btn btn-error btn-outline cursor-pointer hover:bg-error"
        onClick={() => getPosts()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        {errorMsg}
      </button>
    </div>
  );
};

export default ErrorMsg;
