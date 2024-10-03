'use client';

import ChatSection from '@/components/messages/chatSection';
import FriendList from '@/components/messages/friendList';

export default function Home() {
  return (
    <main className='p-4 w-screen h-full flex'>
      <FriendList />
      <ChatSection />
    </main>
  );
}
