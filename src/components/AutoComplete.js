import { useState, useEffect } from 'react';
export default function AutoComplete({ suggestions, setSearch }) {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const DEBOUNCE_DELAY = 500;
  useEffect(() => {
    if (showSuggestions) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [showSuggestions]);
  useEffect(() => {
    const timer = setTimeout(() => {
      input && setInput(filteredSuggestions[activeSuggestion]);
      setShowSuggestions(false);
      setSearch(input);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const onchangeInput = (e) => {
    setInput(e.target.value);

    setShowSuggestions(true);
  };
  const dataFilter = (el) => el.toLowerCase().indexOf(input.toLowerCase()) > -1;
  const filteredSuggestions = suggestions.filter(dataFilter);

  // const onKeyDown = (e) => {
  //   switch (e.keyCode) {
  //     case 13:
  //       setInput(filteredSuggestions[activeSuggestion].name);
  //       setActiveSuggestion(0);
  //       setShowSuggestions(false);
  //       return;
  //     case 38:
  //       if (activeSuggestion === 0) {
  //         return;
  //       }
  //       setActiveSuggestion(activeSuggestion - 1);
  //       return;
  //     case 40:
  //       if (activeSuggestion === filteredSuggestions.length) {
  //         return;
  //       }
  //       setActiveSuggestion(activeSuggestion + 1);
  //       return;
  //     default:
  //       return;
  //   }
  // };

  // const onClickSuggestion = (e) => {
  //   setInput(e.target.innerText);
  //   setActiveSuggestion(0);
  //   setShowSuggestions(false);
  // };

  const suggestionsList = showSuggestions ? (
    <div>
      <ul className='suggestions'>
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestion) {
            className = 'suggestion-active';
          }
          return (
            <li
              className={className}
              key={index}
              // onClick={onClickSuggestion}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    ''
  );

  return (
    <>
      <input
        type='text'
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        onChange={onchangeInput}
        // onKeyDown={onKeyDown}
        value={input}
      />
      {showSuggestions && input && suggestionsList}
    </>
  );
}
