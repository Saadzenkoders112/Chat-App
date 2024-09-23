'use client';

import Image from 'next/image';
import React from 'react';
import ChatSearch from '../search/chatSearch';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddFriend from '../modal/addFriend';

const FriendList = () => {
  return (
    <div className='h-full p-4 rounded-lg bg-gray-700 text-white flex flex-col gap-4'>
      <p className='text-xl text-center font-semibold'>All chats</p>
      <Dialog>
        <DialogTrigger asChild>
          <button className='w-full text-xs p-1 rounded-lg text-center bg-blue-500'>
            Search friends
          </button>
        </DialogTrigger>
        <AddFriend />
      </Dialog>
      <ChatSearch />
      <ul className='text-sm'>
        <li className='flex gap-2 justify-between items-center p-2 '>
          <div className='flex gap-2 items-center'>
            <Image
              src='/assets/images/usericon.png'
              alt='user_img'
              height={20}
              width={20}
            />
            <p>Saad khan</p>
          </div>
          <div className='text-xs text-green-500'>active</div>
        </li>
        <li className='flex gap-2 justify-between items-center p-2 '>
          <div className='flex gap-2 items-center'>
            <Image
              src='/assets/images/usericon.png'
              alt='user_img'
              height={20}
              width={20}
            />
            <p>Saad Khan</p>
          </div>
          <div className='text-xs text-red-500'>offline</div>
        </li>
        <li className='flex gap-2 justify-between items-center p-2 '>
          <div className='flex gap-2 items-center'>
            <Image
              src='/assets/images/usericon.png'
              alt='user_img'
              height={20}
              width={20}
            />
            <p>Saad Khan</p>
          </div>
          <div className='text-xs text-green-500'>active</div>
        </li>
        <li className='flex gap-2 justify-between items-center p-2 '>
          <div className='flex gap-2 items-center'>
            <Image
              src='/assets/images/usericon.png'
              alt='user_img'
              height={20}
              width={20}
            />
            <p>Saad Khan</p>
          </div>
          <div className='text-xs text-red-500'>offline</div>
        </li>
      </ul>
    </div>
  );
};

export default FriendList;
