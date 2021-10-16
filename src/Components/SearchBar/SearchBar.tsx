import React, {MouseEventHandler, useState} from 'react';
import './SearchBar.css';
import {TrackInterface} from "../../util/TrackInterface";

type Props = {
    onSearch: Function;
}

export function SearchBar({onSearch}: Props) {

    const [input, setInput] = useState<{ term: string }>({term: ''});

    const search = () => {
        onSearch(input.term);
    }

    const handleTermChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInput({term: e.currentTarget.value});
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
            <button className="SearchButton" onClick = {search}>SEARCH</button>
        </div>
    )
    
}