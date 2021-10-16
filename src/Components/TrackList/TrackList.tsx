import React from 'react';
import './TrackList.css'
import Track from '../Track/Track'
import {TrackInterface} from "../../util/TrackInterface";


type Props = {
    isRemoval: boolean,
    tracks: TrackInterface[],
    onAdd: Function,
    onRemove: Function,
}

function TrackList({isRemoval, tracks, onAdd, onRemove}: Props) {

    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    return <Track isRemoval = {isRemoval} track={track} key = {track.id} onAdd = {onAdd} onRemove = {onRemove}/>
                })
            }
        </div>
        )
    }

export default TrackList;