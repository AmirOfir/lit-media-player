
import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';

const speedPicker = (context, speedOptions, currentSpeed) => {
  const method = context.changeSpeed.bind(context);
  return html`
    ${repeat(speedOptions, (item,index) => html`
      <div
        selected?="${currentSpeed == item}"
        on-click="${e=> method(item)}">
        <a
          tabindex="-1"
          href="javascript:;"
          >${item}</a>
      </div>
    `)}
    `;
};
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

  /**
  * when new speed is selected
  *
  * @event speed-change
  */

  static get properties() {
    return {
      _currTime: String,
      _videoLength: Number,
      _isPlaying: Boolean,
      _volume: Number,
      _speedSelectorOpen: Boolean,
      _currentSpeed: Number,
      speedOptions: Array,
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
  set currentSpeed(d) {
    this._currentSpeed = d;
  }
  get percentage() {
    const percentage = Math.floor((100 / this._videoLength) * this._currTime);
    return isNaN(percentage) ? 0: percentage;
  }

  dispatch(eventName, detail = null) {
    const obj = { bubbles: true, composed: true, detail};
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
  toggleSpeedPicker() {
    this._speedSelectorOpen = !this._speedSelectorOpen;
  }
  changeSpeed(newSpeed) {
    this.dispatch('speed-change', { newSpeed });
    this._speedSelectorOpen = false;
  }

  _render({_isPlaying, _currTime, _videoLength, _volume, _speedSelectorOpen, speedOptions, _currentSpeed}) {
    const mute = _volume == 0;
    const { percentage } = this;

    const speedPickerElement = speedPicker(this, speedOptions || [0.75, 1, 1.25, 1.5, 2], _currentSpeed || 1);
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          margin-bottom: 18px;
          --iron-icon-width: 16px;
          --iron-icon-height:16px;
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
        #speed-selector {
          position: absolute;
          right: 3px;
          bottom: calc(100% + 2px);
          background: rgba(0,0,0,0.7);
          padding: 10px 3px;
        }
        #speed-selector div {
          padding: 0 7px;
          background: rgba(255,255,255,0);
          transition: 0.2s ease-out;
          cursor: pointer;
          min-width: 25px;
        }
        #speed-selector div[selected] {
          background: rgba(0,255,255,0.2);
        }
        #speed-selector div:hover {
          background: rgba(255,255,255,0.4);
        }
        #speed-selector div[selected]:hover {
          background: rgba(0,255,255,0.6);
        }
        #speed-selector a {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
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
        <button
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
        <button
          title="speed"
          on-click="${e => this.toggleSpeedPicker()}">
          <iron-icon icon="icons:trending-up" />
        </button>

        <div id="speed-selector" hidden?="${!_speedSelectorOpen}">
          ${speedPickerElement}
        </div>
      </div>
    `;
  }

}

// Register the element with the browser.
customElements.define('lit-video-player-controls', LitVideoPlayerControls);
