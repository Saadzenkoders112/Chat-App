import { Search } from 'lucide-react';
import React from 'react';

const AddFriendSearch = () => {
  return (
    <div className='flex gap-2 items-center p-2 rounded-lg border border-slate-400 w-full'>
      <input
        className='focus:outline-none text-sm bg-gray-700'
        type='text'
        placeholder='Search people...'
      />
      <Search className='h-4 w-4 cursor-pointer' />
    </div>
  );
};

export default AddFriendSearch;
