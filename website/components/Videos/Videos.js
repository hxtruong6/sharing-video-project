import React from "react";
import VideoCard from "./VideoCard";

const vis = [
  {
    id: 1,
    title: "Video 1",
    like: 23,
    dislike: 9,
    // description: "abcdegfij",
    sharedUsers: ["user1", "user2", "user3"],
  },
  {
    id: 2,
    title: "Video 2",
    like: 253,
    dislike: 89,
    //description: "abcdegfij",
    sharedUsers: ["user1", "user3"],
  },
  {
    id: 3,
    title: "Video 3",
    like: 2,
    dislike: 9,
    //description: "abcdegfij",
    sharedUsers: ["user7", "user2", "user3"],
  },
  {
    id: 4,
    title: "Video 4",
    like: 53,
    dislike: 95,
    //description: "abcdegfij",
    sharedUsers: ["user5", "user2", "user3"],
  },
];

function Videos({ isLogged }) {
  const videos = vis;

  return (
    <div>
      {videos?.map((video) => (
        <VideoCard key={`vic-${video.id}`} video={video} isLogged={isLogged} />
      ))}
    </div>
  );
}

export default Videos;
