import { useEffect, useState } from "react";
import axios from "axios";

const PostList = ({ newPost }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // ---------- Fetch once ----------
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/posts", { withCredentials: true });

        // Accept either an array or an object containing posts
        const initialPosts = Array.isArray(data) ? data : data?.posts ?? [];

        setPosts(initialPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      }
    })();
  }, []);

  // ---------- Push brand‑new post to top ----------
  useEffect(() => {
    if (newPost && typeof newPost === "object" && !Array.isArray(newPost)) {
      setPosts((prev) => [newPost, ...prev]);
    }
  }, [newPost]);

  if (error) return <p className="text-red-500">{error}</p>;

  // Safety guard: never call .map on a non‑array
  if (!Array.isArray(posts)) return null;

  return (
    <div className="mt-4 space-y-4">
      {posts.length === 0 && <p className="text-sm text-zinc-500">No posts yet.</p>}

      {posts.map((post) => (
        <div key={post._id} className="p-4 border rounded-lg bg-base-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.userId?.profilePic || "/avatar.png"}
              alt={post.userId?.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <strong>{post.userId?.fullName}</strong>
          </div>

          <p className="mb-2">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="max-h-60 rounded-lg"
            />
          )}

          <p className="text-xs text-zinc-500 mt-1">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
