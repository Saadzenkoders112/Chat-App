import React, { useState } from 'react';
import { DialogContent } from '../ui/dialog';
import { getCookieFn } from '@/utils/storage.util';
import axios from 'axios';
import { SearchResults } from '@/types/Interfaces/search.interface';
import AddFriendSearch from '../search/addFriendSearch';

const AddFriend = () => {
  const [searchResults, setSearchResults] = useState<SearchResults[] | null>(
    null,
  );

  const accessToken = getCookieFn('accessToken');
  const handleChange = async (input: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/search/${input}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      setSearchResults(res.data);
    } catch (error) {
      throw new Error('Error');
    }
  };
  return <DialogContent className='bg-white p-4'>
    <AddFriendSearch />
  </DialogContent>;
};

export default AddFriend;
