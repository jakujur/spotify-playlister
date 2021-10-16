import React, {MouseEventHandler} from 'react';
import './SearchResults.css'
import TrackList from '../TrackList/TrackList'
import {TrackInterface} from "../../util/TrackInterface";


type Props = {
    searchResults: TrackInterface[],
    onAdd: Function,
}

export function SearchResults({searchResults, onAdd}: Props) {

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks = {searchResults} isRemoval = {false} onAdd = {onAdd} onRemove={()=>{}}/>
        </div>
    )
}
