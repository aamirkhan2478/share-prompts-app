"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(()=>{
    //get prompt by id
    const getPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (response.ok) {
          const data = await response.json();
          setPost({
            title: data.prompt,
            tag: data.tag,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(promptId) getPrompt()
  },[promptId])
  const updatePrompt= async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptId) return alert("Prompt ID is not found")
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.title,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default CreatePrompt;
