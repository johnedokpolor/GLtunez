
function Playlist(props) {

    function selectSong(id,e) {
        var positionIndex = props.songs.findIndex(song => song.trackId == id)
        console.log(e.target)
        console.log(positionIndex)
        props.setIndex(positionIndex)
        props.setCurrentSong(props.songs[positionIndex])
        props.setIsPlaying(true)
        setTimeout(() => {
            props.song.current.play()
          },500)


    }
    return(
        <div className="playlist" >
            <main id={props.trackId} onClick={e => selectSong(e.target.id,e)}>
            <div className="div-img">
                <img src={props.img} id={props.trackId} alt="song-img" width={70} />
            </div>
            <div>
                <h4 id={props.trackId}>{props.trackName}</h4>
                <p id={props.trackId}>{props.artistName}</p>
            </div>
            </main>
            
            
        </div>
    )
}
export default Playlist
