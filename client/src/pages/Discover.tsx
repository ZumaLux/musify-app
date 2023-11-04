import axios from "axios";
import React, { useEffect, useState } from "react";

// TODO: type vs interface --> separate types in their own folder
type Album = {
  images: [{ url: string }];
};

type Song = {
  track: {
    album: Album;
    artists: Array<Object>;
    href: string;
    id: string;
    name: string;
  };
};

export const Discover = () => {
  const [data, setData] = useState<Array<Song>>();

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/recommended`).then((songs) => {
  //     console.log(songs.data);
  //     setData(songs.data);
  //   });
  // }, []);

  function getSongs() {
    console.log("click");
    axios.get(`http://localhost:5000/recommended`, { withCredentials: true }).then((songs) => {
      console.log(songs.data.tracks.items);
      setData(songs.data.tracks.items);
    });
  }
  return (
    <div>
      <button onClick={() => getSongs()}>Get Popular Songs</button>
      {data
        ? data?.map((song: Song) => (
            <div key={song.track.id}>
              {song.track.name}
              <img src={song.track.album.images[0].url}></img>
            </div>
          ))
        : "No Results"}
    </div>
  );
};
