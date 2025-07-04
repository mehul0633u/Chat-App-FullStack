import { useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const PostPage = () => {
  const [newPost, setNewPost] = useState(null);

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h2 className="text-xl font-bold mb-4">Create a Post</h2>
      <PostForm onPostCreated={setNewPost} />
      <h2 className="text-xl font-bold mt-8 mb-4">All Posts</h2>
      <PostList newPost={newPost} />
    </div>
  );
};

export default PostPage;
