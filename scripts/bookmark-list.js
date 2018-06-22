'use strict';
/* global $, store */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {
  
  const renderList = function() {
    let bookmarks = store.bookmarks;

    const generateBookmarkString = function(bookmark) {
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
                <fieldset class="star-ratings">
                  <legend>Rating</legend>
                  <input type="radio" value="1" id="${bookmark.id}-1" name="rating" hidden>
                  <label for="${bookmark.id}-1" class="star-rating">&starf;</label>
                  <input type="radio" value="2" id="${bookmark.id}-2" name="rating" hidden>
                  <label for="${bookmark.id}-2" class="star-rating">&starf;</label>
                  <input type="radio" value="3" id="${bookmark.id}-3" name="rating" hidden>
                  <label for="${bookmark.id}-3" class="star-rating">&starf;</label>
                  <input type="radio" value="4" id="${bookmark.id}-4" name="rating" hidden checked="checked">
                  <label for="${bookmark.id}-4" class="star-rating">&starf;</label>
                  <input type="radio" value="5" id="${bookmark.id}-5" name="rating" hidden>
                  <label for="${bookmark.id}-5" class="star-rating">&star;</label>
                </fieldset>
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
  const bindEventListeners = function() {};

  return {
    renderList, bindEventListeners
  };
}());