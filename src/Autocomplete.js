import React, { useEffect, useState } from 'react';

const ITEMS_API_URL = 'https://jsonplaceholder.typicode.com/users';
// const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;

// the exported component can be either a function or a class

export default function Autocomplete() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(ITEMS_API_URL)
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  const onchangeInput = (e) => {
    const timer = setTimeout(() => {
      setSearch(e.target.value);
    }, DEBOUNCE_DELAY);
    return () => {
      clearTimeout(timer);
    };
  };

  const dataFilter = (el) =>
    el.name.toLowerCase().match(search.toLowerCase()) && true;

  const filteredList = list.filter(dataFilter);

  return (
    <div className='wrapper'>
      <div className='control'>
        <input type='text' className='input' onChange={onchangeInput} />
      </div>
      <div className='list is-hoverable' />
      <div className='list'>
        {filteredList.map((el) => (
          <a key={Math.random()} className='list-item'>
            {el.name}
          </a>
        ))}
      </div>
    </div>
  );
}
