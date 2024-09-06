import {useEffect, useRef, useState} from 'react';
import MusicPlayer from './MusicPlayer.jsx';
import Swal from 'sweetalert2';
import songsData from "./songs.jsx"

import './style.css';

function App() {
  const clientId = "0a46375938034b3d99f04c1927edf56f"
  const clientSecret = "4aeaa93f959f455fbc6b15eb7b15d82d"
  const [index, setIndex] = useState(0);
  const [songs, setSongs] = useState(songsData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[index]);
  const [accessToken, setAccessToken] = useState('');
  const [searchInput, setSearchInput] = useState([songs[index]]);
  const [array, setArray] = useState([]);
  const song = useRef(null)
  const progress = useRef(null)
  // console.log(searchInput)
  // console.log(accessToken)


  // async function getToken() {
  //   const result = await 
  // }
  useEffect( () => {
     Swal.fire({
      title: 'Welcome to GLtunez🎵',
      text: 'Preview All Your Songs For Free🥳.',
      timer: 2000,
      showConfirmButton: false
    })
//     fetch('https://accounts.spotify.com/api/token', 
//       {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
//     }
// ).then(result => result.json())
// .then(data => setAccessToken(data.access_token))
// .catch(err => console.log(err))
// setCurrentSong(array[index])
  },[array])

  async function searchSong() {
    console.log(`searching for ${searchInput}`)
    const response = await fetch(`https://itunes.apple.com/search?term=${searchInput}&entity=song&limit=20&country=us`)
    const data = await response.json()
    console.log(data.results)
    if (data.results.length !== 0) {
      const artistSongs = data.results
      if (artistSongs.length !== 0) {
        setSongs(artistSongs)  
      setCurrentSong(artistSongs[index])
  
      setTimeout(()=> {
        if(isPlaying) {
        song.current.play()
        }
      },500)  
      }
      else {
        alert("Artist Not Found")
      }
      
    }
    else {
      alert("No Song Found")
    }
   

    

    // var searchParameters =  {
    //   method: 'GET',
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${accessToken}`
    //   }
    //  }
    // console.log("Searching for " + searchInput)
    // get artist ID
    //  const artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
    //  .then(result => result.json())
    //  .then (data => {
    //    console.log(data)
    //   return data.artists.items[0].id
    // })
    //  console.log(`Artist ID is ${artistID}`)
     
    // use artist ID to search for albums
    //  var tracks = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=10`, searchParameters)
    //  .then(result => result.json())
    //  .then (data => {
    // console.log(data.items)
    // })
    }

  function playPause() {
    if (isPlaying) {
      song.current.pause()
      setIsPlaying(prev => !prev);
    }
    else {
      song.current.play()
      setIsPlaying(prev => !prev);
    }
  }

  function loadSong() {
    progress.current.max = song.current.duration;
    progress.current.value = song.current.currentTime
  }
  function seekSong() {
    setIsPlaying(true);
    song.current.play()
    song.current.currentTime = progress.current.value 
  }
  function nextSong() {
    setIndex(prev => prev + 1)
    setCurrentSong(songs[index + 1])
    setTimeout(() => {
      song.current.play()
    },500)
  }

  function forwardSong() {
    if(index+1 === songs.length) {
      alert("No Next Song")
  }
  else {
    setIndex(prev => prev + 1)
    setCurrentSong(songs[index + 1])
    setIsPlaying(true)
    setTimeout(() => {
      song.current.play()
    },500)
  }
  }
  function backwardSong() {
    if(index === 0) {
      alert("No Previous Song")
  }
  else {
    setIndex(prev => prev - 1)
    setCurrentSong(songs[index-1])
    setIsPlaying(true)
    setTimeout(() => {
      song.current.play()
    },500)
  }
  }

 


  if(isPlaying) {
    setInterval(() => {
    progress.current.value = song.current.currentTime
    },1000)
  }
  // if(songs.length === 0) {
  //   alert("No Song Found")
  //   return(
  //     <p>No Songs</p>
  //   )
  // }

  // else {
    
  // }
  return (
    <div>
      <MusicPlayer 
      playPause = {playPause}
      loadSong ={loadSong}
      seekSong = {seekSong}
      nextSong = {nextSong}
      forwardSong = {forwardSong}
      backwardSong = {backwardSong}
      isPlaying = {isPlaying}
      setIsPlaying = {setIsPlaying}
      currentSong = {currentSong}
      setCurrentSong = {setCurrentSong}
      song = {song}
      songs = {songs}
      setSongs = {setSongs}
      index = {index}
      setIndex = {setIndex}
      songsData = {songsData}
      progress = {progress}
      setSearchInput = {setSearchInput}
      searchSong = {searchSong}
    />
    </div>
  )
}

export default App
