'use client';

import ChatSection from '@/components/messages/chatSection';
import FriendList from '@/components/messages/friendList';
import { useEffect } from 'react';
import { socket } from '../../socketConfig';

export default function Home() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Main socket connected');
    });
    socket.on('joining_error', res => {
      console.log('Error connecting socket', res);
    });

    return () => {
      socket.off('connect', () => {
        console.log('Disconnected');
      });
    };
  });
  return (
    <main className='p-4 w-screen h-full flex'>
      <FriendList />
      <ChatSection />
    </main>
  );
}
