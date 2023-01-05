import React from "react";

const Header = (props) => {
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };
  return (
    <header>
      {/* {console.log(props)} */}
      <h1 className="app-header__title">Sticky Notes</h1>
      <aside className="app-header__controls">
        {/* {add event listener  to the button element, passed the addNote eventHandler} */}
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

export default Header;
