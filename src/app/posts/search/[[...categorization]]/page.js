import React from "react";
import { posts as allPosts } from "@static";
import { Post } from "@components";
export default function Search({
  params: { categorization = [] },
  searchParams,
}) {
  const posts = allPosts.filter(el =>
    categorization.every(val =>
      el.categorization.map(el => el.toLowerCase()).includes(val)
    )
  );
  console.log(searchParams);
  return (
    <div>
      <div className="list">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
