const uuid = require("uuid/v4");

const bookmarks = [
  {
    id: uuid(),
    title: "Youtube",
    url: "https://www.youtube.com",
    description:
      "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube."
  },
  {
    id: uuid(),
    title: "Google",
    url: "https://www.google.com",
    description: "Where we find everything on the internet"
  },
  {
    id: uuid(),
    title: "Facebook",
    url: "https://www.facebook.com",
    description: "Connect with other people through social media"
  }
];

module.exports = { bookmarks };
