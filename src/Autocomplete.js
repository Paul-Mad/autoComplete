import React, { useEffect, useState } from 'react';
import './Autocomplete.css';

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
    <div className='pa4 black-80 '>
      <div className='measure center'>
        <input
          type='text'
          className='input-reset ba b--black-20 pa2 mb2 db w-100'
          onChange={onchangeInput}
        />
      </div>
      <div className='pa3 pa5-ns'>
        <ul className='list pl0 measure center'>
          {filteredList.map((el) => (
            <li
              key={Math.random()}
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
