'use client'

import ChatSection from '@/components/messages/chatSection';
import FriendList from '@/components/messages/friendList';
import { getCookieFn } from '@/utils/storage.util';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const accessToken = getCookieFn('accessToken')
  const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected")
    })

    return () => {
      socket.off("disconnect", () => {
        console.log("Disconnected")
      })
    }
  }, [])
  
  return (
    <main className='p-4 w-screen h-full flex'>
      <FriendList />
      <ChatSection />
    </main>
  );
}
