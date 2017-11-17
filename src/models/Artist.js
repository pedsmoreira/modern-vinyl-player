// @flow

import { Model } from "premiere";

import Album from "models/Album";

export default class Artist extends Model {
  path = "artists";
  key = "slug";

  name: string;
  slug: string;
  cover: string;
  description: string;

  static byAlbum(slug: string): Promise<Album[]> {
    return Album.hasOne(Artist, slug, { completeItems: true });
  }

  static all(options: any = {}): Promise<Artist[]> {
    return super.all({ ...options, completeItems: true });
  }

  albums(): Promise<Album[]> {
    return this.hasMany(Album);
  }
}
