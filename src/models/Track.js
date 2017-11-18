// @flow

import { observable } from "mobx";
import { Model } from "premiere";

import Album from "./Album";

export default class Track extends Model {
  path = "tracks";

  id: number;
  src: string;
  name: string;
  number: string;

  @observable invalid: boolean;

  static byAlbum(slug: string): Promise<Track[]> {
    return Album.hasMany(Track, slug, { completeItems: true });
  }

  album(): Promise<Album> {
    return this.belongsTo(Album, { url: `${this.album_id}` });
  }
}
