import React from "react";

interface SongCardProps {
  song: Object;
  isPlaying: Boolean;
  activeSong: Object;
  data: Object;
  index: Number;
}

export const SongCard: React.FC<SongCardProps> = ({ song, isPlaying, activeSong, data, index }) => {
  return <div>SongCard</div>;
};
