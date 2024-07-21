import { AnimatePresence, motion, Variants } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IMovie } from "../types";
import Movie from "./Movie";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPathState,
  isModalOpenState,
  selectedMovieState,
} from "../atoms";
import MovieDetail from "./MovieDetail";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
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

const ModalWrapper = styled(motion.div)`
  position: fixed;
  z-index: 1001;
  width: 40vw;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const container: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 0.3,
    },
  },
};

const List = ({ movies, path }: { movies: IMovie[]; path: string }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const selectedMovie = useRecoilValue(selectedMovieState);
  const setCurrentPath = useSetRecoilState(currentPathState);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (params.movieId && !isModalOpen) {
      navigate(path);
    }
  }, [isModalOpen, navigate, params.movieId, path]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [setCurrentPath, location.pathname]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(path);
  };

  return (
    <>
      <Wrapper initial="hidden" animate="visible" variants={container}>
        {movies.map((movie) => (
          <motion.div key={movie.id + path} variants={item}>
            <Movie path={path} movie={movie} />
          </motion.div>
        ))}
      </Wrapper>
      <AnimatePresence>
        {isModalOpen && (
          <>
            <Overlay onClick={closeModal} />
            <ModalWrapper layoutId={String(selectedMovie?.id) + path}>
              <MovieDetail id={String(selectedMovie?.id) || ""} />
            </ModalWrapper>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default List;
