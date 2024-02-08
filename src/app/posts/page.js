import { Post, AddPostForm } from "@components";

export default async function Posts() {
  const getPosts = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URI_BACKEND}/posts`, {
      headers: {
        apikey: process.env.API_KEY,
      },
    });
    return await data.json();
  };

  const getTags = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URI_BACKEND}/posts/tags`,
      {
        headers: {
          apikey: process.env.API_KEY,
        },
      }
    );
    return await data.json();
  };

  const { posts } = await getPosts();
  const { tags } = await getTags();

  const fields = [
    {
      name: "title",
    },
    {
      name: "content",
    },
    {
      name: "createdBy",
    },
    {
      name: "tags",
      type: "select",
      values: tags,
    },
    {
      name: "categorization",
      type: "select",
      values: ["Animaux", "Chats", "Chiens"],
    },
  ];
  return (
    <div className="main">
      <div className="list">
        <AddPostForm fields={fields} />
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
