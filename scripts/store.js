'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addBookmark = function(bookmark) {
    // console.log('store.addBookmark was just passed ', bookmark);
    this.bookmarks.unshift(bookmark);
  };

  return {
    bookmarks: [],
    adding: true,
    filter: 0,
    error: null,

    addBookmark
  };
}());