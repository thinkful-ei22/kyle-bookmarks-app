'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  return {
    bookmarks: [],
    adding: true,
    filter: 0,
    error: null,

    addBookmark
  };
}());