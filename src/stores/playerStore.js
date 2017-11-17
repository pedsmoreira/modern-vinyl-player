// @flow

import { action, computed, observable } from "mobx";

import Track from "models/Track";
import Dispatcher from "utils/Dispatcher";

export type State = "playing" | "loading" | "paused";

class PlayerStore {
  @observable track: ?Track;
  @observable playlist: Track[] = [];
  @observable loading: boolean;

  playDispatcher: Dispatcher = new Dispatcher();
  pauseDispatcher: Dispatcher = new Dispatcher();
  seekDispatcher: Dispatcher = new Dispatcher();
  volumeDispatcher: Dispatcher = new Dispatcher();

  @action
  setTrack(track: Track, playlist: Track[]) {
    if (playlist.indexOf(track) === -1) throw new Error("Selected track is not on playlist");

    this.track = track;
    this.playlist = playlist;
  }

  @action
  play() {
    this.playDispatcher.dispatch();
  }

  @action
  pause() {
    this.pauseDispatcher.dispatch();
  }

  @action
  seekTo(time: number) {
    this.seekDispatcher.dispatch(time);
  }

  @action
  setVolume(volume: number) {
    this.volumeDispatcher.dispatch(volume);
  }

  @action
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @computed
  hasPrevious() {
    return this.track && this.playlist.indexOf(this.track) > 0;
  }

  @computed
  hasNext() {
    return this.track && this.playlist.indexOf(this.track) < this.playlist.length - 1;
  }
}

export default new PlayerStore();
