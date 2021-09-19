const clientId = '99628be188c3474898db128733508ca3';
const riderectURI = 'http://spotify-playlister.surge.sh'
let accessToken;

const Spotify = {
    getAccesToken(){
        if (accessToken){
            return accessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${riderectURI}`
            window.location = accessURL;
        }
    },

    search(term){

        const accessToken = Spotify.getAccesToken();
        const headers = { Authorization: `Bearer ${accessToken}`}; 

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
                return jsonResponse.tracks.items.map(track => ({
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
    },

    savePlaylist(name, tracksUris){
        if (!name || !tracksUris.length){
            return;
        }

        const accessToken = Spotify.getAccesToken();
        const headers = { Authorization: `Bearer ${accessToken}`}; 
        let userId;

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
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: tracksUris})
                })
            })
        })
    }
};

export default Spotify;