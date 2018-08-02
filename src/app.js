import { start } from './Game.js';

function onLoad() {
  start();
}
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', onLoad, false);
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', onLoad);
} else {
  window.onload = onLoad;
}
