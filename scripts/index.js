'use strict';
/* global $, bookmarkList, api, store */

$(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.renderList();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.renderList();
  });
});
