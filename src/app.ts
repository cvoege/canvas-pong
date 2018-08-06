import { start } from './Game';

function onLoad() {
  start();
}
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', onLoad, false);
} else {
  window.onload = onLoad;
}
