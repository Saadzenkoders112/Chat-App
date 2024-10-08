'use client';

import { getCookieFn } from '@/utils/storage.util';
import { SendHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { socket } from '../../../socketConfig';
import axios from 'axios';
import { Message } from '@/types/Interfaces/message.interface';

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [inputVal, setInputVal] = useState<string | ''>('');
  const accessToken = getCookieFn('accessToken');
  const searchParams = useSearchParams();
  const chatId = searchParams.get('id');
  const roomName = searchParams.get('roomName');
  const currentUser = getCookieFn('currentUser');
  const currentUserObj = currentUser && JSON.parse(currentUser);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/getChats?roomId=${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.log(error as string);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      socket.emit('join_room', { roomId: chatId, userId: currentUserObj.id });
    }

    socket.on('new_message', res => {
      console.log(res);
      setMessages(prev => [...prev, res]);
    });

    socket.on('room_joined', (res: string) => {
      console.log(res);
    });

    return () => {
      socket.off('connect');
      socket.off('join_room');
      socket.off('room_joined');
      socket.off('new_message');
    };
  }, [chatId, messages]);

  const handleInput = () => {
    socket.emit(
      'sendMessage',
      { roomId: chatId, userId: currentUserObj.id, message: inputVal },
      () => {
        console.log('Message sent');
      },
    );
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == 'Enter') {
      handleInput();
    }
  };

  return (
    <>
      {chatId ? (
        <div className='flex-1 p-2 flex flex-col justify-between h-[95%]'>
          <div className='flex items-center gap-2 w-full'>
            <Image
              src='/assets/images/usericon.png'
              alt='user_img'
              height={30}
              width={30}
            />
            <div>
              <p className='text-white text-sm'>{roomName}</p>
              <div className='flex gap-2 items-center'>
                <div className='p-1 rounded-full bg-green-500'></div>
                <p className='text-green-500 text-xs'>active</p>
              </div>
            </div>
          </div>
          {messages?.length === 0 ? (
            <div className='w-full h-full flex justify-center items-center text-2xl text-white font-semibold'>
              <p>Start a chat...</p>
            </div>
          ) : (
            <div className='flex-grow p-2 overflow-y-auto'>
              <ul className='p-1'>
                {messages?.map((msg, index) => (
                  <li
                    className={`w-full mb-2 text-white p-1 flex ${msg.senderId === currentUserObj?.id ? 'justify-end' : ''}`}
                    key={index}
                  >
                    <div>
                      <p
                        className={`${msg.senderId === currentUserObj?.id ? 'bg-blue-500' : 'bg-gray-700'} rounded-lg p-1`}
                      >
                        {msg.message}
                      </p>
                      <p className='text-xs'>
                        {new Date(msg.sentAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='flex gap-2 items-center p-2 rounded-lg bg-gray-600 text-gray-100 w-full'>
            <input
              className='focus:outline-none text-sm bg-gray-600 w-full'
              type='text'
              placeholder='Search people...'
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SendHorizontal
              onClick={handleInput}
              className='h-4 w-4 cursor-pointer'
            />
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center text-2xl text-white font-semibold'>
          <p>Chat App</p>
        </div>
      )}
    </>
  );
};

export default ChatSection;
