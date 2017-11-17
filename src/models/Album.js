// @flow

import { Model } from "premiere";

import Track from "models/Track";
import Artist from "models/Artist";

export default class Album extends Model {
  path = "albums";
  key = "slug";

  name: string;
  slug: string;
  cover: string;
  year: number;
  description: string;

  static byArtist(slug: string): Promise<Album[]> {
    return Artist.hasMany(Album, slug, { completeItems: true });
  }

  static all(options: any = {}): Promise<Album[]> {
    return super.all({ ...options, completeItems: true });
  }

  tracks(): Promise<Track[]> {
    return this.hasMany(Track, { completeItems: true });
  }

  artist(): Promise<Artist> {
    return this.belongsTo(Artist, { completeItems: true });
  }
}
