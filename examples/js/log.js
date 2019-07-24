(function () {
  const $log = document.getElementById('log');

  function log(message) {
    var element = document.createElement('li');
    element.innerHTML = `${message}`;

    console.log(message);
    $log.append(element);
  }

  window.log = log;
}());
