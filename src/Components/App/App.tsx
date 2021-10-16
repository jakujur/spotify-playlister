import './App.css';
import React, { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import {searchSpotify, saveSpotifyPlaylist} from '../../util/Spotify'
import  {TrackInterface} from "../../util/TrackInterface";


function App() {

  const [searchResults, setSearchResults] = useState<TrackInterface[]>([]);
  const [playlistName, setPlaylistName] = useState<string>('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState<TrackInterface[]>([]);

  const addTrack = (track: TrackInterface) => {
    let tracks: TrackInterface[] = playlistTracks;

    if (!tracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...tracks, track]);
    }
  }

  const removeTrack = (track: TrackInterface) => {
    let tracks: TrackInterface[] = playlistTracks;
    tracks = tracks.filter(preservedTrack => preservedTrack.id !== track.id);

    setPlaylistTracks(tracks);
  }

  const updatePlaylistName = (name: string) => {
    setPlaylistName(name);
  } 

  const savePlaylist = () => {
    const trackURIs: string[] = playlistTracks.map(track => track.uri);
    saveSpotifyPlaylist(playlistName, trackURIs)?.then(() => {

      setPlaylistName('New Playlist');
      setPlaylistTracks([]);

    });
  }

  const search = (term: string) => {
    searchSpotify(term).then(results => {
      setSearchResults(results)
    });
  }

  return (
    <div>
      <h1><span className="highlight">Spotify Play</span>lister</h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults 
            searchResults = {searchResults} 
            onAdd = {addTrack}/>
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove = {removeTrack} 
            onNameChange={updatePlaylistName} 
            onSave={savePlaylist}/>
        </div>
      </div>
    </div>
  )
  
}

export default App;
