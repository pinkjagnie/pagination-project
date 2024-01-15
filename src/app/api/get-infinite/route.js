export async function GET(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.error({ message: "Ups, something went wrong" });
  }
}
