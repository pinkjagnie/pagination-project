export async function GET(req, res) {
  if (req.method !== "GET") {
    return;
  }

  console.log("======", req.query);
  const page = req.nextUrl.searchParams.get("page");
  console.log(req.nextUrl.searchParams);
  console.log(" === PAGE == ", page);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    const resp = posts.slice((page - 1) * 4, page * 4);

    return Response.json(resp);
  } catch (error) {
    console.log(error);
    return Response.error({ message: "Ups, something went wrong" });
  }
}
