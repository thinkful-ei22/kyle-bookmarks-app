'use strict';
/* global $ */

// eslint-disable-next-line no-unused-vars
const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mysdirector/bookmarks';

  const getBookmarks = function(onSuccess) {
    $.ajax({
      url: BASE_URL,
      method: 'GET',
      contentType: 'application/json',
      success: onSuccess
    });
  };

  const createBookmark = function(newBookmark, onSuccess) {
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: onSuccess
    });
  };


  return {
    getBookmarks, createBookmark
  };
}());