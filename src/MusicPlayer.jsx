import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faAngleLeft, faBackward, faForward, faPlay, faPause, faSearch, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Playlist from './Playlist.jsx';


function MusicPlayer(props) {
    const[isPlaylist, setIsPlaylist] = useState(false)

    function playDefault() {
        props.setSongs(props.songsData)
        props.setCurrentSong(props.songsData[props.index])
        props.setIsPlaying(true)
        setTimeout(() => {
            props.song.current.play()
          },500)
    }

    return(
        <div className="container">
        <div className="music-player">
          <nav>
            <div className="circle">
              <FontAwesomeIcon icon={faAngleLeft} onClick={playDefault} />
            </div>
            <div className="search">
            <input type="text" onChange={e => props.setSearchInput(e.target.value)} placeholder='Search Songs or Artists...' onKeyDown={e => {
                if (e.key === "Enter") {
                    props.searchSong()
                }
            }}/>
            <FontAwesomeIcon icon={faSearch} className='search-icon'  onClick={props.searchSong}/>
            </div>
          </nav>
          <div className={isPlaylist? "playlists show" : "playlists"}>
          <FontAwesomeIcon icon={isPlaylist? faAngleDown : faAngleUp } onClick={() => setIsPlaylist(prev => !prev)} className='hide' />
            <section>
                {props.songs.map(song => {
                return (
                        <Playlist
                            key ={song.trackId}
                            img = {song.artworkUrl100}
                            trackName = {song.trackName} 
                            artistName = {song.artistName}
                            trackId = {song.trackId}
                            songs = {props.songs}
                            song = {props.song}
                            setCurrentSong = {props.setCurrentSong}
                            setIsPlaying = {props.setIsPlaying}
                        />
                )})}
            </section>
         
          </div>
          <div className="img-div">
            <img src={props.currentSong.artworkUrl100} alt="song-img"  className={props.isPlaying? "song-img play" : "song-img"} />
          </div>
  
          <h1>{props.currentSong.trackName}</h1> 
          <p>{props.currentSong.artistName}</p>
  
          <audio ref={props.song} src={props.currentSong.previewUrl} onLoadedMetadata={props.loadSong} onEnded={props.nextSong}></audio>
          <input ref={props.progress} type="range" id="progress" onChange={props.seekSong}/>
  
          <div className="controls">
             <div onClick={props.backwardSong}><FontAwesomeIcon icon={faBackward} /></div>
             <div onClick={props.playPause}><FontAwesomeIcon icon={props.isPlaying? faPause : faPlay} /></div>
             <div><FontAwesomeIcon icon={faForward} onClick={props.forwardSong} /></div> 
          </div>
        </div>
      </div>
    )
}

export default MusicPlayer
