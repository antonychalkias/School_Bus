import React from 'react';
import { Input } from 'antd';

const SearchBar = () => {
  return (
    <div>
      <Input.Search placeholder="Search Plans or Associates" enterButton />
    </div>
  );
};

export default SearchBar;
