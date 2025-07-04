import { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { content };

      if (image) {
        const base64 = await toBase64(image);
        payload.image = base64;
      }

      const res = await axios.post("/api/posts", payload, {
        withCredentials: true, // ✅ Required for cookies/session auth
      });

      console.log("Post created:", res.data);
      onPostCreated(res.data);
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Post failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <form onSubmit={handlePost} className="space-y-3 p-4 border rounded-lg bg-base-200">
      <textarea
        className="w-full textarea textarea-bordered"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="file-input file-input-sm"
      />

      <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
