// @flow

import { action, computed, observable } from "mobx";
import YouTube from "react-youtube";

import Track from "models/Track";
import Dispatcher from "utils/Dispatcher";

class PlayerStore {
  @observable track: ?Track;
  @observable playlist: Track[] = [];
  @observable state: number;

  playDispatcher: Dispatcher = new Dispatcher();
  pauseDispatcher: Dispatcher = new Dispatcher();
  seekDispatcher: Dispatcher = new Dispatcher();
  volumeDispatcher: Dispatcher = new Dispatcher();

  @action.bound
  toggle(): void {
    if (this.track) {
      this.toggleTrack(this.track);
    }
  }

  @action.bound
  toggleTrack(track: Track): void {
    if (track !== this.track) {
      this.setTrack(track);
      return;
    }

    this.isPaused ? this.play() : this.pause();
  }

  @action.bound
  async setTrack(track: Track): Promise<void> {
    this.track = track;

    const album = await track.album();
    const tracks = await album.tracks();
    this.setPlaylist(tracks);
  }

  @action.bound
  setPlaylist(playlist: Track[]) {
    this.playlist = playlist;
  }

  @action.bound
  play(): void {
    this.playDispatcher.dispatch();
  }

  @action.bound
  pause(): void {
    this.pauseDispatcher.dispatch();
  }

  @action.bound
  seekTo(time: number): void {
    this.seekDispatcher.dispatch(time);
  }

  @action.bound
  setVolume(volume: number): void {
    this.volumeDispatcher.dispatch(volume);
  }

  @action.bound
  previous(): void {
    if (this.track && this.hasPrevious) {
      this.track = this.playlist[this.playlist.indexOf(this.track) - 1];
    } else {
      this.track = null;
    }
  }

  @action.bound
  next(): void {
    if (this.track && this.hasNext) {
      this.track = this.playlist[this.playlist.indexOf(this.track) + 1];
    } else {
      this.track = null;
    }
  }

  @action.bound
  onEmbedStateChange({ data }: { data: number }): void {
    this.state = data;
  }

  @action.bound
  onEmbedError({ data }: { data: number }): void {
    if (this.track) {
      this.track.invalid = true;
    }

    this.next();
  }

  @computed
  get isPlaying(): boolean {
    return this.state === YouTube.PlayerState.PLAYING;
  }

  @computed
  get isPaused(): boolean {
    return this.state === YouTube.PlayerState.PAUSED;
  }

  @computed
  get hasPrevious(): boolean {
    return !!(this.track && this.playlist.indexOf(this.track) > 0);
  }

  @computed
  get hasNext(): boolean {
    return !!(this.track && this.playlist.indexOf(this.track) < this.playlist.length - 1);
  }
}

export default new PlayerStore();
