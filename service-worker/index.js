'use strict';

import { PATTERNS } from 'ember-service-worker-deferred-requests/service-worker/config';
import {
  createUrlRegEx,
  urlMatchesAnyPattern
} from 'ember-service-worker/service-worker/url-utils';

const PATTERN_REGEX = PATTERNS.map(createUrlRegEx);

let _queue;

const _flush = function() {
  let i = 0;
  return _queue.reduce((prevPromise, request) => {
    return prevPromise.then(function() {
      return fetch(request);
    });
  }, Promise.resolve());
};

const _store = function(request) {
  return new Promise(resolve => {
    _queue.push(request);
    resolve({
      message: 'No network available.',
      code: 'no_network_available'
    });
  });
};

self.addEventListener('install', event => {
  // Initialize queue
  _queue = [];
});

self.addEventListener('fetch', event => {
  let request = event.request;

  if (!navigator.onLine) {
    if (urlMatchesAnyPattern(request.url, PATTERN_REGEX)) {
      return;
    }

    let isPUTRequest = request.method === 'PUT';
    let isPOSTRequest = request.method === 'POST';
    let isPATCHRequest = request.method === 'PATCH';

    if (isPUTRequest || isPOSTRequest || isPATCHRequest) {
      // Store the request
      return _store(request);
    }
  } else {
    if (_queue.length >= 1) {
      // Play the stored requests then the new one
      return _flush().then(() => {
        return fetch(request);
      });
    }
  }
});
