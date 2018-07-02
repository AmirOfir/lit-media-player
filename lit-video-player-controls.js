
import { LitElement, html } from '@polymer/lit-element';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
/*
// @LitVideoPlayerControls
*/
class LitVideoPlayerControls extends LitElement {

  /**
   * when play button pressed
   *
   * @event play
   */

  /**
  * when pause button pressed
  *
  * @event pause
  */

  /**
  * when stop button pressed
  *
  * @event stop
  */

  /**
  * when volume up pressed
  *
  * @event volumeUp
  */

  /**
  * when volume down pressed
  *
  * @event volumeDown
  */

  /**
  * when mute is toggled
  *
  * @event mute
  */

  /**
  * when replay is pressed
  *
  * @event replay
  */

  static get properties() {
    return {
      _currTime: String,
      _videoLength: Number,
      _isPlaying: Boolean,
      _volume: Number,
    };
  }

  set currentTime(t) {
    this._currTime = t;
    this.requestRender();
  }
  set videoLength(d) {
    this._videoLength = d;
  }
  set isPlaying(b) {
    this._isPlaying = b;
    this.requestRender();
  }
  set volume(d) {
    this._volume = d;
    this.requestRender();
  }


  get percentage() {
    const percentage = Math.floor((100 / this._videoLength) * this._currTime);
    return isNaN(percentage) ? 0: percentage;
  }

  dispatch(eventName) {
    const obj = { bubbles: true, composed: true, detail: null};
    const ev = new CustomEvent(eventName, obj);
    this.dispatchEvent(ev);
  }

  getElementById(id) {
    return this.shadowRoot.getElementById(id);
  }

  togglePlayPause() {
    if (this._isPlaying)
      this.dispatch("pause");
    else
      this.dispatch("play");
  }
  stopPlayer() {
    this.dispatch('stop');
  }
  changeVolume(direction) {
    if (direction === '+')
      this.dispatch('volumeUp');
    else
      this.dispatch('volumeDown');
  }
  toggleMute() {
    this.dispatch('mute');
  }
  replayMedia() {
    this.dispatch('replay');
  }

  _render({_isPlaying, _currTime, _videoLength, _volume}) {
    const mute = _volume == 0;
    const { percentage } = this;
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
         #media-controls {
           display: flex
         }
         [hidden] {
           display:none !important;
         }
      </style>
      <div id="media-controls">
        <progress
          id="progress-bar"
          min="0"
          max="100"
          value="${percentage}"
        ></progress>

        <button
          id="replay-button"
          class="replay"
          title="replay"
          on-click="${e => this.replayMedia()}">
            <iron-icon icon="av:replay"></iron-icon>
          </button>
        <button
          title="pause"
          on-click="${e => tihs.togglePlayPause(e)}"
          hidden?="${!_isPlaying}"
        ><iron-icon icon="av:pause"></iron-icon>
        </button>
        <button id="play-pause-button"
          title="play"
          hidden?="${!!_isPlaying}"
          on-click="${e => this.togglePlayPause(e)}">
          <iron-icon icon="av:play-arrow"></iron-icon>
        </button>
        <button
          id="stop-button"
          class="stop"
          title="stop"
          on-click="${e => this.stopPlayer()}">
          <iron-icon icon="av:stop"></iron-icon>
        </button>
        <button
          title="increase volume"
          on-click="${e => this.changeVolume("+")}">
          <iron-icon icon="av:volume-up"></iron-icon>
        </button>
        <button
          title="decrease volume"
          onclick="${e => this.changeVolume("-")}">
          <iron-icon icon="av:volume-down"></iron-icon>
        </button>
        <button id="mute-button"
          hidden?="${!mute}"
          title="mute"
          on-click="${e => this.toggleMute()}">
          <iron-icon icon="av:volume-off"></iron-icon>
        </button>
        <button
          hidden?="${mute}"
          title="mute"
          on-click="${e => this.toggleMute()}">
          <iron-icon icon="av:volume-mute"></iron-icon>
        </button>
      </div>
    `;
  }

}

// Register the element with the browser.
customElements.define('lit-video-player-controls', LitVideoPlayerControls);
