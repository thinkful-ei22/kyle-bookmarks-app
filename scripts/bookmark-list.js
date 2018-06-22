'use strict';
/* global $, store, api */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  
  const renderControls = function() {

    const generateControls = function() {
      return `
        <div class="row">
          <div class="col-3">
            <button class="js-create-bookmark create-bookmark">ADD BOOKMARK</button>
          </div>
          <div class="col-3">
            <select id="filter-bookmarks" class="filter-bookmarks" title="Filter bookmarks">
              <option value="" selected disabled hidden>Minimum Rating</option>
              <option value="0">Show All</option>
              <option value="5">&starf;&starf;&starf;&starf;&starf;</option>
              <option value="4">&starf;&starf;&starf;&starf;&star;</option>
              <option value="3">&starf;&starf;&starf;&star;&star;</option>
              <option value="2">&starf;&starf;&star;&star;&star;</option>
              <option value="1">&starf;&star;&star;&star;&star;</option>
            </select>
          </div>
        </div>
      `;
    };

    const generateNewForm = function() {
      return `
        <div class="row">
          <div class="col-12" class="new-bookmark">
            <form id="new-bookmark" class="new-bookmark">
              <h2>Create a Bookmark:</h2>
              <div class="row">
                <div class="col-6">
                  <label for="new-title">Title:</label>
                </div>
                <div class="col-6">
                  <input type="text" name="title" id="new-title" class="new-item-input" placeholder="Add a name">
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label for="new-url">Url:</label>
                </div>
                <div class="col-6">
                  <input type="url" name="url" id="new-url" class="new-item-input" placeholder="https://...">
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label for="new-rating">Rating:</label>
                </div>
                <div class="col-6">
                  <fieldset class="star-ratings">
                    <legend>Rating</legend>
                    <input type="radio" value="1" id="new-bookmark-1" name="rating" form="new-bookmark">
                    <label for="new-bookmark-1" class="star-rating">1</label>
                    <input type="radio" value="2" id="new-bookmark-2" name="rating" form="new-bookmark">
                    <label for="new-bookmark-2" class="star-rating">2</label>
                    <input type="radio" value="3" id="new-bookmark-3" name="rating" form="new-bookmark">
                    <label for="new-bookmark-3" class="star-rating">3</label>
                    <input type="radio" value="4" id="new-bookmark-4" name="rating" form="new-bookmark">
                    <label for="new-bookmark-4" class="star-rating">4</label>
                    <input type="radio" value="5" id="new-bookmark-5" name="rating" form="new-bookmark">
                    <label for="new-bookmark-5" class="star-rating">5</label>
                  </fieldset>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label for="new-description">Description:</label>
                </div>
                <div class="col-6">
                  <textarea name="desc" id="new-description" class="new-item-input new-description" placeholder="Description, notes, etc."></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <section class="error-message">
                    <button id="cancel-error">X</button>
                    <p>Title must be longer than 5 characters</p>
                  </section>
                </div>
                <div class="col-3">
                  <button type="submit">Create</button>
                  <button>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;
    };

    let html = '';
    html += generateControls();
    html += generateNewForm();
    $('.top-section').html(html);
  };

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
    renderControls();
    renderList();
  };

  const handleNewBookmarkSubmit = function() {
    $('.top-section').on('submit', '#new-bookmark', function(event) {
      event.preventDefault();

      const newBookmark = $(event.target).serializeJSON();
      $('#new-bookmark')[0].reset();

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