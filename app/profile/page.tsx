'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const ProfilePage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
    
    if (hasConfirmed)
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE'
        });
  
        res.ok && setPosts((prevPosts) => prevPosts.filter((post) => post._id !== post._id));
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);

      const data = await res.json();

      setPosts(data);
    };
    if (session?.user.id)
      fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;