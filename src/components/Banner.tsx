import { getPopular, makeBgPath } from "../api";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "./Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isModalOpenState, selectedMovieState } from "../atoms";
import { IMovie } from "../types";
import { AnimatePresence } from "framer-motion";

const SideArrow = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7%;
  height: 100%;
  position: absolute;
  font-size: 40px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

const LeftArrow = styled(SideArrow)`
  left: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RightArrow = styled(SideArrow)`
  right: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Wrapper = styled.div`
  margin-top: 55px;
  width: 100%;
  position: relative;
  display: flex;

  &:hover {
    ${LeftArrow} {
      opacity: 1;
    }
    ${RightArrow} {
      opacity: 1;
    }
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;

  cursor: pointer;
`;

const Title = styled.div`
  bottom: 30px;
  position: absolute;
  color: white;
  padding: 10px 15px;
  font-size: 38px;
  user-select: none;
`;

const Banner = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useQuery(["banner"], getPopular);
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const setSelectedMovie = useSetRecoilState(selectedMovieState);

  const prevMovie = () => {
    if (!data.results || data.results.length === 0) return;
    setIndex((prev) => (prev - 1 === -1 ? prev : prev - 1));
  };

  const nextMovie = () => {
    if (!data.results || data.results.length === 0) return;
    setIndex((prev) => (prev + 1 === data.results.length ? prev : prev + 1));
  };

  const bannerClick = (movie: IMovie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
    if (location.pathname === "/") {
      navigate(`/movies/${movie.id}`);
    } else if (
      location.pathname === "/coming-soon" ||
      location.pathname === "/now-playing"
    ) {
      navigate(`${location.pathname}/movies/${movie.id}`);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingWrapper>
          <Loading size={"40%"} />
        </LoadingWrapper>
      ) : (
        <>
          <LeftArrow onClick={prevMovie}>{"<"}</LeftArrow>
          <AnimatePresence>
            <Cover
              onClick={() => bannerClick(data?.results[index])}
              $bgPhoto={makeBgPath(data?.results[index]?.backdrop_path)}
            >
              <Title>{data?.results[index]?.title}</Title>
            </Cover>
          </AnimatePresence>

          <RightArrow onClick={nextMovie}>{">"}</RightArrow>
        </>
      )}
    </Wrapper>
  );
};

export default Banner;
