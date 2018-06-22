'use strict';
/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  
  const renderList = function() {
    let bookmarks = store.bookmarks;

    const starRating = function(bookmark) {
      switch(bookmark.rating) {
      case 1:
        return '&starf;&star;&star;&star;&star;';
      case 2:
        return '&starf;&starf;&star;&star;&star;';
      case 3:
        return '&starf;&starf;&starf;&star;&star;';
      case 4:
        return '&starf;&starf;&starf;&starf;&star;';
      case 5:
        return '&starf;&starf;&starf;&starf;&starf;';
      }
      return '&star;&star;&star;&star;&star;';
    };

    const generateBookmarkString = function(bookmark) {
      // console.log('`generateBookmarkString` was passed ', bookmark);
      const description = (bookmark.desc) ? bookmark.desc : '';

      return `
        <li class="js-bookmark-element bookmark-element"  data-item-id="${bookmark.id}">
          <div class="bookmark-title">
            <h3>${bookmark.title}</h3>
          </div>
          <div class="bookmark-details"> <!-- toggle 'hidden' here to hide div -->
            <p>${description}</p>
            <a class="js-site-link btn" href="${bookmark.url}" target="_blank">Visit Site</a>
          </div>
          <form class="js-bookmark-props bookmark-props" id="${bookmark.id}-form">
            <div class="row">
              <div class="col-6">
                <p>${starRating(bookmark)}</p>
              </div>
              <div class="col-3 offset-3">
                <button class="far fa-trash-alt btn-delete"><span class="btn-label">Delete</span></button>
              </div>
            </div>
          </form>
        </li>
      `;
    };

    const generateBookmarkListString = function(bookmarks) {
      let listString = '';

      bookmarks.forEach(bookmark => {
        listString += generateBookmarkString(bookmark);
      });

      return listString;
    };

    let bookmarkListHtml = '';
    bookmarkListHtml += generateBookmarkListString(bookmarks);

    $('.bookmark-list').html(bookmarkListHtml);
  };

  const render = function() {
    renderList();
  };

  const handleNewBookmarkSubmit = function() {
    $('.top-section').on('submit', '#new-bookmark', function(event) {
      event.preventDefault();
      $('#new-bookmark')[0].reset();

      const newBookmark = $(event.target).serializeJSON();

      const onSuccess = function(returnedBookmark) {
        store.addBookmark(returnedBookmark);  
        render();
      };

      api.createBookmark(newBookmark, onSuccess);
    });
  };

  const handleDeleteBookmarkClicked = function() {
    $('.bookmark-list').on('click', '.btn-delete', function(event) {
      event.preventDefault();

      const currentId = $(event.target).closest('li').attr('data-item-id');

      const onSuccess = function() {
        store.findAndDelete(currentId);
        render();
      };

      api.deleteBookmark(currentId, onSuccess);
    });
  };

  const bindEventListeners = function() {
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
  };

  return {
    render, bindEventListeners
  };
}());