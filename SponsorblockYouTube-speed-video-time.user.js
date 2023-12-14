// ==UserScript==
// @name         SponsorblockYouTube-speed-video-time
// @namespace    https://github.com/LostViking09/SponsorblockYouTube-speed-video-time
// @version      1.0
// @downloadURL  https://github.com/LostViking09/SponsorblockYouTube-speed-video-time/raw/main/SponsorblockYouTube-speed-video-time.user.js
// @updateURL    https://github.com/LostViking09/SponsorblockYouTube-speed-video-time/raw/main/SponsorblockYouTube-speed-video-time.user.js
// @description  Adjusts the video time on Sponsorblock-enabled YouTube pages depending on the playback speed, as well as displaying the when the video will end
// @author       LostViking09
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {

    // Run the function every second
setInterval(updateAdjustedDuration, 1000);

})();

// Get the original element
var originalElement = document.getElementById('sponsorBlockDurationAfterSkips');
originalElement.style.display = 'none';

// Create a new element to hold the adjusted duration and finish time
var newElement = document.createElement('span');
newElement.id = 'adjustedSponsorBlockDuration'; // You can use a different ID if needed

// Append the new element after the original one
originalElement.parentNode.insertBefore(newElement, originalElement.nextSibling);

// Define a function to get and update the adjusted duration and finish time
function updateAdjustedDuration() {
  // Copy the attributes and content of the original element
  newElement.innerHTML = originalElement.innerHTML;

  // Extract minutes and seconds from the string
  var match = newElement.innerHTML.match(/\s*\((\d+):(\d+)\)/);

  if (match) {
    // Extracted minutes and seconds
    var minutes = parseInt(match[1], 10);
    var seconds = parseInt(match[2], 10);

    // Get the current video playback speed
    var playbackSpeed = parseFloat(document.querySelector('.html5-main-video').playbackRate);

    // Convert everything to minutes, considering the playback speed
    var totalMinutes = (minutes + seconds / 60) / playbackSpeed;

    // Calculate the new minutes and seconds in XX:XX format
    var newMinutes = Math.floor(totalMinutes);
    var newSeconds = Math.floor((totalMinutes - newMinutes) * 60);

    // Update the innerHTML of the new element with the new duration and finish time in XX:XX format
    newElement.innerHTML = ' (' + (newMinutes < 10 ? '0' : '') + newMinutes + ':' + (newSeconds < 10 ? '0' : '') + newSeconds + ')';

    // Calculate finish time
    var now = new Date();
    now.setMinutes(now.getMinutes() + newMinutes);
    now.setSeconds(now.getSeconds() + newSeconds);
    var finishTime = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    // Append finish time to the innerHTML
    newElement.innerHTML += ' <span class="ytp-chapter-title-prefix" aria-hidden="true">  •</span>Finish Time: <b>' + finishTime + '</b>';
  } else {
  }
}

