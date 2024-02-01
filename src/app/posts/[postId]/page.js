import React from "react";
import { posts } from "@static";
import Link from "next/link";

export default function PostPage({ params: { postId } }) {
  const post = posts.find(el => String(el.id) === postId);

  if (!post) return <div>There's nothing here. Try again.</div>;
  return (
    <div className="main">
      <div className="post">
        <h1>{post.title}</h1>
        <h2>{post.content}</h2>
      </div>
      <h4>Commentaires</h4>
      {post.comments.map(comment => (
        <Link key={comment.id} href={`/posts/${postId}/comments/${comment.id}`}>
          {comment.content} - {comment.createdBy}
        </Link>
      ))}
    </div>
  );
}
