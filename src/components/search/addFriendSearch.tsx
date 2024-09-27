import { SearchResults } from '@/types/Interfaces/search.interface';
import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';
import { Search } from 'lucide-react';
import React from 'react';

interface AddFriendSearchProps {
  setSearchResults: React.Dispatch<
    React.SetStateAction<SearchResults[] | null>
  >;
  setSearchError: React.Dispatch<React.SetStateAction<string | ''>>;
}

const AddFriendSearch: React.FC<AddFriendSearchProps> = ({
  setSearchResults,
  setSearchError,
}) => {
  const accessToken = getCookieFn('accessToken');

  const handleChange = async (input: string) => {
    try {
      if (input !== '') {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/search/${input}`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        setSearchResults(res.data);
      }
    } catch (error) {
      setSearchError(error as string);
    }
  };

  return (
    <div className='flex gap-2 h-max items-center p-2 rounded-lg border border-slate-400 w-full mt-8'>
      <input
        className='focus:outline-none text-sm w-full'
        type='text'
        placeholder='Search people...'
        onChange={e => handleChange(e.target.value)}
      />
      <Search className='h-4 w-4 cursor-pointer' />
    </div>
  );
};

export default AddFriendSearch;
