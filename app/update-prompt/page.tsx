'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import React, { FormEvent, useState, useEffect } from 'react';

export interface Post {
  prompt: string;
  tag: string;
}

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: ''
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    if (!promptId)
      return alert('Prompt ID not found');

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });

      res.ok && router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);

      const data = await res.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag
      });
    };

    if (promptId)
      getPromptDetails();
  }, [promptId]);
  

  return (
    <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
  );
};

export default UpdatePrompt;