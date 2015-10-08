chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('dest/window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});