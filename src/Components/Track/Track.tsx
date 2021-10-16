import React, {MouseEventHandler} from 'react';
import './Track.css'
import {TrackInterface} from "../../util/TrackInterface";

type Props = {
    isRemoval: boolean,
    track: TrackInterface,
    onAdd: Function,
    onRemove: Function,
}

export function Track({isRemoval, track, onAdd, onRemove}: Props) {

    const addTrack = () => {
        onAdd(track);
    }

    const removeTrack = () => {
        onRemove(track);
    }

    const renderAction = () => {
        if (isRemoval) {
            return <button className="Track-action" onClick = {removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick = {addTrack}>+</button>
        }
    }

    return (
        <div className="Track">
            <img className="Track-image" src={track.image} alt='album img'/>
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist}  | {track.album}</p>
            </div>
            {renderAction()} 
        </div>
    )
}

export default Track;