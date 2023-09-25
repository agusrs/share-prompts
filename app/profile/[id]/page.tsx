'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);

      const data = await res.json();

      setPosts(data);
    };
    fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName ?? 'User'}
      desc={`Welcome to ${userName ?? 'User'}'s personalized profile page`}
      data={posts}
    />
  );
};

export default ProfilePage;