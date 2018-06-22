'use strict';
/* global $ */

// eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mysdirector/bookmarks';

  const getBookmarks = function(callback) {
    $.ajax({
      url: BASE_URL,
      method: 'GET',
      contentType: 'application/json',
      success: callback
    });
  };

  const createBookmark = function() {

  };


  return {
    getBookmarks, createBookmark
  };
}());