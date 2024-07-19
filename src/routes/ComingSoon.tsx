import { useEffect, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import Movie from "../components/Movie";
import { getComingSoon } from "../api";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const ComingSoon = () => {
  const [comingSoonMovies, setComingSoonMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getComingSoon();
      setComingSoonMovies(response.results);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          {comingSoonMovies.map((movie) => (
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

export default ComingSoon;
