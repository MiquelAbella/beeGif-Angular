export interface Gif {
  _id: string;
  title: string;
  url: string;
  owner: string;
  tag: string;
}

export interface GifResponse {
  ok: boolean;
  gif: Gif;
}

export interface GifsResponse {
  ok: boolean;
  gifs: Gif[];
}

export interface editGifsResponse {
  ok: boolean;
  updatedGif: Gif;
}

export interface deleteGifsResponse {
  ok: boolean;
}

export interface uploadFormValues {
  title?: string | null | undefined;
  url?: string | null | undefined;
  owner?: string | null | undefined;
}
