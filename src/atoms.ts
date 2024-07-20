import { atom } from "recoil";
import { IMovie } from "./types";

export const selectedMovieState = atom<IMovie | null>({
  key: "selectedMovieState",
  default: null,
});

export const currentPathState = atom<string>({
  key: "currentPathState",
  default: "/",
});

export const isModalOpenState = atom<boolean>({
  key: "isModalOpenState",
  default: false,
});

export const popularMoviesState = atom<IMovie[]>({
  key: "popularMoviesState",
  default: [],
});
