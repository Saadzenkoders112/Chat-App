'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ChatSearch from '../search/chatSearch';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddFriend from '../modal/addFriend';
import axios from 'axios';
import { getCookieFn } from '@/utils/storage.util';
import { Room } from '@/types/Interfaces/room.interface';
import { useRouter } from 'next/navigation';

const FriendList = () => {
  const [rooms, setRooms] = useState<Room[] | []>([]);
  const accessToken = getCookieFn('accessToken');

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => {
    setIsOpen(false);
  };

  const router = useRouter();

  return (
    <div className='h-full p-4 rounded-lg bg-gray-700 text-white flex flex-col gap-4'>
      <p className='text-xl text-center font-semibold'>All chats</p>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <button className='w-full text-xs p-1 rounded-lg text-center bg-blue-500'>
            Search friends
          </button>
        </DialogTrigger>
        <AddFriend closeDialog={closeDialog} />
      </Dialog>
      <ChatSearch />
      <ul className='text-sm overflow-y-auto scrollbar-thin'>
        {rooms.length === 0 ? (
          <div>Loading...</div>
        ) : (
          rooms?.map((room, index) => (
            <li
              key={index}
              className='flex gap-2 justify-between items-center p-2 cursor-pointer'
              onClick={() => router.push(`?id=${room.id}`)}
            >
              <div className='flex gap-2 items-center'>
                <Image
                  src='/assets/images/usericon.png'
                  alt='user_img'
                  height={20}
                  width={20}
                />
                <p>{room.name}</p>
              </div>
              <div className='text-xs text-green-500'>active</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FriendList;
