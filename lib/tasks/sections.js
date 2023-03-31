module.exports = resolve;
var debug = require('debug')('inliner');

function resolve(inliner, todo, $) {
  debug('start %s section', todo.length);
  return todo.map(function sections(section) {
    var url = $(section).attr('data-background-image');

    if (inliner.options.skipAbsoluteUrls &&
        (url.indexOf('//') === 0 || url.indexOf('http') === 0)) {
      debug('skipping remote section data');
      inliner.emit('progress', 'skipping remote section data');
      return false;
    }

    url = inliner.resolve(inliner.url, url);
    return inliner.image(url).then(function then(dataURL) {
      $(section).attr('data-background-image', dataURL);
    }).then(inliner.jobs.done.sections);
  });
}

