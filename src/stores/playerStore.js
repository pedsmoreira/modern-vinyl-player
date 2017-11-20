// @flow

import { action, computed, observable } from "mobx";
import YouTube from "react-youtube";

import Album from "models/Album";
import Track from "models/Track";
import Dispatcher from "utils/Dispatcher";

class PlayerStore {
  @observable track: ?Track;
  @observable album: ?Album;
  @observable playlist: Track[] = [];
  @observable state: number;

  @observable progress: number = 0;
  @observable duration: number = 0;
  @observable volume: number = 100;

  playDispatcher: Dispatcher = new Dispatcher();
  pauseDispatcher: Dispatcher = new Dispatcher();
  seekDispatcher: Dispatcher = new Dispatcher();
  volumeDispatcher: Dispatcher = new Dispatcher();

  @action.bound
  toggle(): void {
    if (this.track && this.album) {
      this.toggleTrack(this.track, this.album);
    }
  }

  @action.bound
  toggleTrack(track: Track, album: Album): void {
    if (track !== this.track) {
      this.setTrack(track, album);
      return;
    }

    if (this.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  }

  @action.bound
  setTrack(track: ?Track, album: ?Album): void {
    this.track = track;
    this.album = album;

    if (track && album) this.fetchAndSetPlaylist();
  }

  async fetchAndSetPlaylist(): Promise<void> {
    if (!this.track || !this.album) throw new Error("fetchAndSetPlaylist called without track or album");

    const tracks = await this.album.tracks();
    action(() => (this.playlist = tracks))();
  }

  @action.bound
  play(): void {
    this.state = YouTube.PlayerState.PLAYING;
    this.playDispatcher.dispatch();
  }

  @action.bound
  pause(): void {
    this.state = YouTube.PlayerState.PAUSED;
    this.pauseDispatcher.dispatch();
  }

  @action.bound
  seekTo(time: number): void {
    this.progress = time;
    this.seekDispatcher.dispatch(time);
  }

  @action.bound
  setVolume(volume: number): void {
    this.volume = volume;
    this.volumeDispatcher.dispatch(volume);
  }

  @action.bound
  playPrevious(): void {
    let track;
    if (this.track && this.hasPrevious) {
      track = this.playlist[this.playlist.indexOf(this.track) - 1];
    }

    this.setTrack(track, this.album);
  }

  @action.bound
  playNext(): void {
    let track;
    if (this.track && this.hasNext) {
      track = this.playlist[this.playlist.indexOf(this.track) + 1];
    }

    this.setTrack(track, this.album);
  }

  @action.bound
  onEmbedStateChange(state: number): void {
    this.state = state;
  }

  @action.bound
  onEmbedError(): void {
    if (this.track) {
      this.track.invalid = true;
    }

    this.playNext();
  }

  @action.bound
  onEmbedDuration(duration: number): void {
    this.duration = duration;
  }

  @action.bound
  onEmbedProgress(time: number): void {
    this.progress = time;
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
