'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const toggleExpanded = function(id) {
    const bookmark = this.bookmarks.filter(bookmark => bookmark.id === id);
    bookmark[0].expanded = !bookmark[0].expanded;
  };

  const toggleAdding = function() {
    this.adding = !this.adding;
  };

  const setFilter = function(num) {
    this.filter = num;
  };

  const setError = function(message) {
    this.error = message;
  };

  return {
    bookmarks: [],
    adding: true,
    filter: 0,
    error: null,

    addBookmark,
    findAndDelete,
    toggleExpanded,
    toggleAdding,
    setFilter,
    setError
  };
}());
