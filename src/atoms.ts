import { atom } from "recoil";
import { IMovie } from "./types";

export const popularMoviesState = atom<IMovie[]>({
  key: "popularMoviesState",
  default: [],
});
