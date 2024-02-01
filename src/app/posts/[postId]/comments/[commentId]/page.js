import React from "react";
import { posts } from "@static";

export default function PostPage({ params: { postId, commentId } }) {
  const post = posts.find(el => String(el.id) === postId);

  const comment = post?.comments?.find(el => String(el.id) === commentId);
  if (!comment) return <div>There's nothing here. Try again.</div>;
  return (
    <div className="main">
      <div className="post">
        <h1>{comment.content}</h1>
        <h2>- {comment.createdBy}</h2>
      </div>
    </div>
  );
}
