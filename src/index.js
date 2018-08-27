import styles from './styles.scss';
import _ from 'lodash';
import fetchJsonp from 'fetch-jsonp';

const SEARCH_URL = 'https://openapi.etsy.com/v2/listings/active.js?' +
    'keywords=:term&' +
    'region=US&' +
    'api_key=qticqqdyceljrvzziqs4qu2f',
    MAX_DESC_LENGTH = 250;

let products = [],

    /* elements
    -------------------------------- */
    table = document.getElementById( 'searchResults' ),
    itemList = document.getElementById( 'itemList' ),
    searchBar = document.getElementById( 'searchTerm' ),
    searchButton = document.getElementById( 'search' ),
    loader = document.getElementById( 'loadContainer'),

    /* functions
    -------------------------------- */
    genItemRow = function ( item, idx ) {
      return `<th scope="row">${ idx }</th>
          <td><a href="${ item.url }" target="_blank">${ item.title }</a></td>
          <td>${ truncate( item.description, MAX_DESC_LENGTH ) }</td>
          <td>$${ item.price }</td>`;
    },

    searchEtsy = function () {
      let url = '';

      if ( searchBar.value.length > 0 ) {
        url = SEARCH_URL.replace( ':term', encodeURI( searchBar.value ) );

        resetProducts();
        addClass( loader, 'loading' );

        fetchJsonp( url, { jsonpCallbackFunction: 'getData' } ).then( function ( response ) {

          return response.json();
        } ).then( function ( json ) {
          products = json.results;

          renderItems( products, itemList );

          removeClass( table, 'hidden' );
          removeClass( loader, 'loading' );

        } ).catch( function ( ex ) {
          console.log( '[ERROR!]', ex );
        } );
      }
    },

    renderItems = function ( items, list ) {
      _.forEach( items, function ( item, idx ) {
        list.insertRow().innerHTML = genItemRow( item, idx + 1 );
      } );
    },

    addClass = function ( element, cls ) {
      if ( element.className.search( cls ) === -1 ) {
        element.className += ' ' + cls;
      }
    },
    removeClass = function ( element, cls ) {
      if ( element.className.search( cls ) > -1 ) {
        element.className = element.className.replace( cls, '' );
      }
    },

    resetProducts = function () {
      products = [];
      itemList.innerHTML = '';
      addClass( table, 'hidden' );
    },

    truncate = function ( text, max ) {
      return (text.length > max) ? text.substring( 0, MAX_DESC_LENGTH ) + '...' : text;
    };

/* behaviors
-------------------------------- */
searchButton.onclick = searchEtsy;
searchBar.onkeypress = function ( evt ) {
  if ( evt.key === 'Enter' ) {
    evt.preventDefault();
    searchEtsy();
  }
};
