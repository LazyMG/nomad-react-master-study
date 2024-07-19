import { useEffect, useState } from "react";
import { IMovie } from "../types";
import { getNowPlaying } from "../api";
import styled from "styled-components";
import Movie from "../components/Movie";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const NowPlaying = () => {
  const [nowPlayngMovies, setNowPlayingMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getNowPlaying();
      setNowPlayingMovies(response.results);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          {nowPlayngMovies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              img={movie.poster_path}
            />
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default NowPlaying;
