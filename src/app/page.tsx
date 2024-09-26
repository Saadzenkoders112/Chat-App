'use client'

import ChatSection from '@/components/messages/chatSection';
import FriendList from '@/components/messages/friendList';
import { getCookieFn } from '@/utils/storage.util';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  
  return (
    <main className='p-4 w-screen h-full flex'>
      <FriendList />
      <ChatSection />
    </main>
  );
}
