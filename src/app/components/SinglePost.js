import Image from "next/image";

const SinglePost = ({ title, body }) => {
  return (
    <div className="w-[90%] mx-auto card lg:card-side bg-base-100 shadow-xl pt-4 my-10 lg:my-4">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="post photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default SinglePost;
