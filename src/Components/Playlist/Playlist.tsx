import './Playlist.css'
import React, { MouseEventHandler } from 'react'
import TrackList from '../TrackList/TrackList'
import {TrackInterface} from "../../util/TrackInterface";

type Props = {
    playlistName: string,
    playlistTracks: TrackInterface[],
    onRemove: Function,
    onNameChange: Function,
    onSave: MouseEventHandler,
}

export function Playlist({playlistTracks, onRemove, onNameChange, onSave}: Props) {

    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        onNameChange(e.currentTarget.value);
    }

    return (
        <div className="Playlist">
            <input defaultValue={"New Playlist"} onChange={handleNameChange} />
            <TrackList tracks={playlistTracks} onRemove = {onRemove} isRemoval={true} onAdd={()=>{}}/>
            <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
    
}