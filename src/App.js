import React, { useState, useRef, useCallback } from 'react';
import UserBookSearch from './UserBookSearch';


function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const { books, hasMore, loading, error }
    = UserBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    console.log("Log: -----> : App -> node", node)
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevePageNumber => prevePageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)

  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }


  return (
    <>
      <input type="text" value={query} onChange={handleSearch} />
      {
        books.map((book, index) => {
          if (books.length === index + 1) {
            return <div ref={lastBookElementRef} key={book}>{book}</div>
          } else {
            return <div key={book}>{book}</div>
          }
        })
      }
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}

export default App;
