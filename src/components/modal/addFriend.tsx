import React, { useState } from 'react';
import { DialogContent } from '../ui/dialog';
import { getCookieFn } from '@/utils/storage.util';
import { SearchResults } from '@/types/Interfaces/search.interface';
import AddFriendSearch from '../search/addFriendSearch';
import { IoPersonAdd } from 'react-icons/io5';
import { io } from 'socket.io-client';
import { Bounce, toast } from 'react-toastify';

interface AddFriendProps {
  closeDialog: () => void;
}

const AddFriend: React.FC<AddFriendProps> = ({closeDialog}) => {
  const [searchResults, setSearchResults] = useState<SearchResults[] | null>(
    null,
  );
  const currentUser = getCookieFn('currentUser');
  const currentUserObj = currentUser  && JSON.parse(currentUser)
  const [searchError, setSearchError] = useState<string>('');

  const accessToken = getCookieFn('accessToken');

  const handleAddFriend = (id: string,friendName: string) => {
    let socket = io('https://zenchat-backend-vnhm.onrender.com', {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    socket.emit('CREATE_ROOM', {
      type: 'direct',
      participants: [id],
      name: `${currentUserObj.firstName} - ${friendName}`
    }, (res: any) => {
      toast.success("Friend added!", {
        position:"top-center",
        transition: Bounce
      })
      closeDialog()
    })
  };
  

  return (
    <DialogContent className='bg-white p-4'>
      <p className='text-2xl text-center'>Add Friend</p>
      <AddFriendSearch
        setSearchResults={setSearchResults}
        setSearchError={setSearchError}
      />
      <ul className='p-1'>
        {searchError ? (
          <div>{searchError}</div>
        ) : (
          searchResults?.map((user, index) => (
            <li
              className='p-1 flex justify-between items-center w-full text-sm border border-slate-300 rounded-lg mb-1 cursor-pointer hover:bg-slate-100 duration-200'
              key={index}
            >
              <p>
                {user.firstName} {user.lastName}
              </p>
              <IoPersonAdd
                onClick={() => handleAddFriend(user.id, user.firstName)}
                className='h-4 w-4 cursor-pointer z-20 text-slate-600'
              />
            </li>
          ))
        )}
      </ul>
    </DialogContent>
  );
};

export default AddFriend;
