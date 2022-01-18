import React, { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete';

const ITEMS_API_URL = 'https://jsonplaceholder.typicode.com/users';
// const ITEMS_API_URL = 'https://example.com/api/items';

// the exported component can be either a function or a class

export default function SearchList() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(ITEMS_API_URL)
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  const dataFilter = (el) =>
    el.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  const filteredList = list.filter(dataFilter);

  return (
    <div className='pa4 black-80 '>
      <div className='measure center input'>
        <AutoComplete
          suggestions={list.map((el) => el.name)}
          input={search}
          setSearch={setSearch}
        />
      </div>
      <div className='pa3 pa5-ns'>
        <ul className='list pl0 measure center'>
          {filteredList.map((el) => (
            <li
              key={el.id}
              className='lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30'
            >
              {el.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
