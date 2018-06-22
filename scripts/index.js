'use strict';
/* global $, bookmarkList, api, store */

$(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});
