import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPathState,
  isModalOpenState,
  selectedMovieState,
} from "../atoms";
import { IMovie } from "../types";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  cursor: pointer;
`;

const Image = styled(motion.img)`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-family: "Francois One", sans-serif;
  color: ${(props) => props.theme.textColor};
`;

const Movie = ({ movie, path }: { movie: IMovie; path: string }) => {
  const navigate = useNavigate();
  const setSelectedMovie = useSetRecoilState(selectedMovieState);
  const currentPath = useRecoilValue(currentPathState);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);

  const gotoMovieDetail = (id: number) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    if (currentPath === "/") {
      navigate(`/movies/${id}`);
    } else if (
      currentPath === "/coming-soon" ||
      currentPath === "/now-playing"
    ) {
      navigate(`${currentPath}/movies/${id}`);
    }
  };

  return (
    <Wrapper
      layoutId={String(movie.id) + path}
      onClick={() => gotoMovieDetail(movie.id)}
      whileHover={{
        y: -10,
        transition: {
          type: "spring",
          mass: 0.5,
          bounce: 0.25,
          duration: 0.1,
          ease: "easeOut",
        },
      }}
    >
      <Image src={makeImagePath(movie.poster_path)} />
      <Title>{movie.title}</Title>
    </Wrapper>
  );
};

export default Movie;
