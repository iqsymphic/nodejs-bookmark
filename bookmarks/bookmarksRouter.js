const express = require("express");
const uuid = require("uuid/v4");
const logger = require("../logger");
const bookmark = require("../bookmark");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route("./bookmarks")
  .get((req, res) => {
    res.json(bookmark.bookmarks);
  })

  .post(bodyParser, (req, res) => {
    for (const field of ["title", "url"]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`${field} is required`);
      }
    }
    const { title, url, description } = req.body;

    const fullBookmark = { id: uuid(), title, url, description };

    bookmark.bookmarks.push(fullBookmark);

    logger.info(`Bookmark with id ${fullBookmark.id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${fullBookmark.id}`)
      .json(fullBookmark);
  });

bookmarksRouter
  .route("/bookmarks/:fullBookmark_id")
  .get((req, res) => {
    const { fullBookmark_id } = req.params;
    const fullBookmark = bookmark.bookmarks.find(c => c.id == fullBookmark_id);

    if (!fullBookmark) {
      logger.error(`Bookmark with id ${fullBookmark_id} not found`);
      return res.status(404).send("Bookmark Not Found");
    }

    res.json(fullBookmark);
  })

  .delete((req, res) => {
    const { fullBookmark_id } = req.params;
    const fullBookmarkIndex = bookmark.fullBookmark.findIndex(
      b => b.id === fullBookmark_id
    );

    if (fullBookmarkIndex === -1) {
      logger.error(`Bookmark with id ${fullBookmark_id} not found`);
      return res.status(404).send("Bookmark not found");
    }

    bookmark.fullBookmark.splice(fullBookmarkIndex, 1);

    logger.info(`Bookmark with id ${fullBookmark_id} deleted`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;
