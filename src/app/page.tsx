'use client';

import ChatSection from '@/components/messages/chatSection';
import FriendList from '@/components/messages/friendList';
import { useEffect } from 'react';
import { socket } from '../../socketConfig';
import io from 'socket.io-client';
import { useSocket } from '@/providers/socket-provider';

export default function Home() {
  const { isConnected } = useSocket();
  console.log(isConnected)
  return (
    <main className='p-4 w-screen h-full flex'>
      <FriendList />
      {!isConnected ? <div>Not connected</div> : <div>Connected</div>}
      <ChatSection />
    </main>
  );
}
