'use client'

import { getCookieFn } from '@/utils/storage.util';
import { SendHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatSection = () => {
  const accessToken = getCookieFn('accessToken');
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")
  const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  useEffect(() => {
    socket.on("RECEIVED_MESSAGE", () => {
      console.log("Messages recieved")
    })
  }, [])

  return (
    <div className='flex-1 p-2 flex flex-col justify-between'>
      <div className='flex items-center gap-2 w-full'>
        <Image
          src='/assets/images/usericon.png'
          alt='user_img'
          height={30}
          width={30}
        />
        <div>
          <p className='text-white text-sm'>Saad khan</p>
          <div className='flex gap-2 items-center'>
            <div className='p-1 rounded-full bg-green-500'></div>
            <p className='text-green-500 text-xs'>active</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 items-center p-2 rounded-lg bg-gray-600 text-gray-100 w-full'>
        <input
          className='focus:outline-none text-sm bg-gray-600 w-full'
          type='text'
          placeholder='Search people...'
        />
        <SendHorizontal className='h-4 w-4 cursor-pointer' />
      </div>
    </div>
  );
};

export default ChatSection;
