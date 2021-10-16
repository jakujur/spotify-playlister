const clientId: string = '99628be188c3474898db128733508ca3';
const riderectURI: string = 'http://localhost:3000'
let accessToken: string;

export function getAccesToken(){
        if (accessToken){
            return accessToken
        }

        const accessTokenMatch: RegExpMatchArray | null = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch: RegExpMatchArray | null = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn: number = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', '/');
            return accessToken;
        } else {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${riderectURI}`;
        }
    }

    export function searchSpotify(term: string){

        const accessToken: string | undefined = getAccesToken();
        const headers: {Authorization: string} = { Authorization: `Bearer ${accessToken}`}; 

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: headers}
        ).then(response => {

            if (response.ok) {
                return response.json();
            }
            
            throw  new Error('Request failed!');

        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if (!jsonResponse.tracks){
                return [];
            } else {
                return jsonResponse.tracks.items.map((track: { id: string; name: string; artists: { name: string; }[]; album: { name: string; images: { url: string; }[]; }; uri: string; preview_url: string; }) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    preview: track.preview_url,
                    image: track.album.images[2].url
                }));
            }
        });
    }

    export function saveSpotifyPlaylist(name: string, tracksUris: string[]){
        if (!name || !tracksUris.length){
            return;
        }

        const accessToken: string | undefined = getAccesToken();
        const headers: {Authorization: string} = { Authorization: `Bearer ${accessToken}`}; 
        let userId: string;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId: string = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: tracksUris})
                })
            })
        })
    }
