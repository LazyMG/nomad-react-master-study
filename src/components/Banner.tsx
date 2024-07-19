import { useEffect, useState } from "react";
import { IMovie } from "../types";
import { getPopular, makeBgPath } from "../api";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { popularMoviesState } from "../atoms";

const SideArrorw = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  position: absolute;
  left: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 40px;
  color: white;
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  &:hover {
  }
`;

const Cover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const Banner = () => {
  const [popularMovies, setPopularMovies] = useRecoilState<IMovie[]>(
    popularMoviesState
  );
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getPopular();
      setPopularMovies(response.results);
      setIsLoading(false);
    })();
  }, [setPopularMovies]);

  const nextMovie = () => {
    if (!popularMovies || popularMovies.length === 0) return;
    setIndex((prev) => (prev + 1 === popularMovies.length ? prev : prev + 1));
  };

  return (
    <Wrapper>
      <SideArrorw>{"<"}</SideArrorw>
      <Cover
        onClick={nextMovie}
        $bgPhoto={makeBgPath(popularMovies[index]?.backdrop_path)}
      ></Cover>
    </Wrapper>
  );
};

export default Banner;
