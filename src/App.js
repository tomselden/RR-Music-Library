import './App.css';
import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import Gallery from './components/Gallery'


function App() {
  const SearchBar = React.lazy(() => import('./components/SearchBar'))
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
      {message}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <div>
              <Suspense fallback={<h1>Loading Search Bar...</h1>}>
              <SearchBar handleSearch={handleSearch} />
              </Suspense>
              <Gallery data={data} />
            </div>
          }/>
          <Route path="/album/:id" element={
            <AlbumView/>
          }/>
          <Route path="/artist/:id" element={
            <ArtistView/>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
