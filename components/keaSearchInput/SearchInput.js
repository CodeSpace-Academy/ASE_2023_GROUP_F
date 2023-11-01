import React from 'react'
import { filterContext, FilterProvider } from '../../components/search-functionality/filterContext'
import { useContext, useRef , useState } from 'react';

function SearchInput() {
    const { filters, setFilters } = useContext(filterContext);
    const [title , setTitle] = useState('')
    const inputRef = useRef();

    const handleSubmit = () => {
        setFilters(title);

    }

  return (
    <div>
      <input type="text" ref={inputRef} onChange={(e) => {setTitle(e.target.value)}} />
      <button onClick={handleSubmit}>Submit</button>
      <span>{JSON.stringify(filters)}</span>
    </div>
  )
}

export default SearchInput
