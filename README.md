# Ember Service Worker Deferred Requests

_An Ember Service Worker plugin that enqueue PUT, POST and PATCH requests while in offline in a buffer to perform the operations once the connection is regained._

## F#$& my assets aren't updating in development mode

Turn on the "Update on reload" setting in the `Application > Service Workers`
menu in the Chrome devtools.

## Installation (not ready yet)

```
ember install ember-service-worker-deferred-requests
```

## Configuration

The configuration is done in the `ember-cli-build.js` file:

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'esw-deferred-requests': {
      // RegExp patterns specifying which URLs to cache.
      patterns: [
        '/api/v1/(.+)',
        'https://cdn.example.com/assets/fonts/(.+)',
        'https://cdn.example.com/assets/images/((?!avatars/).+)'
      ]
    }
  });

  return app.toTree();
};
```

## Authors

* [Guillaume Gérard](http://twitter.com/ggerard88)

## Versioning

This library follows [Semantic Versioning](http://semver.org)

## Want to help?

Please do! We are always looking to improve this library. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-service-worker-index/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
