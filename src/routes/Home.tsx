import { useEffect, useState } from "react";
import { IMovie } from "../types";
import { getPopular } from "../api";
import styled from "styled-components";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import { useMatch } from "react-router-dom";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Overlay = styled(motion.div)`
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
`;

const Home = () => {
  const [homeMovies, setHomeMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const detailMatch = useMatch("/movies/:movieId");

  useEffect(() => {
    (async () => {
      const response = await getPopular();
      setHomeMovies(response.results);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            {homeMovies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                img={movie.poster_path}
              />
            ))}
          </Wrapper>
          {detailMatch && (
            <>
              <Overlay />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
