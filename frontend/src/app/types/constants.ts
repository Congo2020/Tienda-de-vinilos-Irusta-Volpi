export const VINYL_GENRES = [
  "Rock",
  "Pop",
  "Jazz",
  "Blues",
  "Classical",
  "Electronic",
  "Hip Hop",
  "R&B",
  "Country",
  "Reggae",
  "Metal",
  "Punk",
  "Indie",
  "Folk",
  "Soul",
  "Funk",
  "Progressive Rock",
  "Psychedelic",
] as const;

export type VinylGenre = typeof VINYL_GENRES[number];

