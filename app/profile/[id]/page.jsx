"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Profile from "@components/Profile";

const OtherProfile = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const { id } = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (id) fetchPosts();
  }, [id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = () => {};

  return (
    <Profile
      name={name}
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default OtherProfile;
