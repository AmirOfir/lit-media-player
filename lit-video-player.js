// eslint-disable
import { LitElement, html } from '@polymer/lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import './lit-video-player-controls.js'
/*
// @LitVideoPlayer
*/
class LitVideoPlayer extends LitElement {

  /**
   * Fired after video finished.
   *
   * @event end
   */

  static get properties() {
    return {
      src: String,
    };
  }

  getElementById(id) {
    return this.shadowRoot.getElementById(id);
  }

  get mediaPlayer() {
    return this.getElementById('video');
  }

  get controls() {
    return this.getElementById('lit-video-player-controls');
  }

  _didRender() {
    this.mediaPlayer.controls = false;
    this.controls.currTime = this.mediaPlayer.currentTime;
    this.controls.videoLength = this.mediaPlayer.duration;

    this.mediaPlayer.addEventListener('timeupdate', () => this.updateProgressBar(), false);
    this.mediaPlayer.addEventListener('play', () => {
      this.controls.isPlaying = true;
    }, false);
    this.mediaPlayer.addEventListener('pause', () => {
      this.controls.isPlaying = false;
    }, false);
    this.mediaPlayer.addEventListener('volumechange', (e) => {
      this.controls.volume = this.mediaPlayer.volume;
    }, false);
    this.mediaPlayer.addEventListener('ended', () => {
      this.dispatchEvent(
        new CustomEvent('ended', { bubbles: true, composed: true, detail: null}));
    });
  }

  updateProgressBar() {
    this.controls.currTime = this.mediaPlayer.currentTime;
  }

  togglePlayPause() {
    const { mediaPlayer }= this;
    if (mediaPlayer.paused || mediaPlayer.ended) {
        mediaPlayer.play();
     } else {
        mediaPlayer.pause();
     }
  }

  stopPlayer() {
    this.mediaPlayer.pause();
    this.mediaPlayer.currentTime = 0;
  }

  changeVolume(direction) {
    const { mediaPlayer }= this;
    if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
    else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
    mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
    this.controls.volume = this.mediaPlayer.volume;
  }

  toggleMute() {
    this.mediaPlayer.muted = !this.mediaPlayer.muted;
    this.controls.volume = this.mediaPlayer.volume;
  }

  resetMedia() {
    this.mediaPlayer.currentTime = 0;
    this.mediaPlayer.play();
    this.controls.currTime = this.mediaPlayer.currentTime;
  }

  _render({src}) {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          margin-bottom: 18px;
        }
         progress {
           flex-grow: 2;
           height: 30px;
         }
         video {
           display: block;
           width: 100%;
         }
      </style>
      <div>
        <video src$="${src}" id="video">
        </video>
      </div>
      <lit-video-player-controls
        on-pause="${e => this.togglePlayPause()}"
        on-play="${e => this.togglePlayPause()}"
        on-stop="${e => this.stopPlayer()}"
        on-replay="${e => this.resetMedia()}"
        on-mute="${e => this.toggleMute()}"
        on-volume-up="${e => this.changeVolume('+')}"
        on-volume-down="${e => this.changeVolume('-')}"
      ></lit-video-player-controls>
    `;
  }
}

// Register the element with the browser.
customElements.define('lit-video-player', LitVideoPlayer);
