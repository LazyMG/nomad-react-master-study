import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isModalOpenState, selectedMovieState } from "../atoms";
import { getMovie, makeBgPath } from "../api";
import { useQuery } from "react-query";
import { IMovieDetail } from "../types";

const Wrapper = styled.div`
  //background-color: rgba(0, 0, 0, 0.8);
  background-color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: relative;
`;

const CloseButton = styled.div`
  padding: 5px 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  color: white;
  user-select: none;
  cursor: pointer;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Title = styled.h3`
  color: black;
  padding: 20px;
  font-size: 28px;
  position: relative;
  top: -90px;
`;

const OverView = styled.p`
  padding: 20px;
  color: black;
  position: relative;
  top: -90px;
  width: 60%;
`;

const MovieDetail = ({ id }: { id: string }) => {
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieState);
  const setModalIsOpen = useSetRecoilState(isModalOpenState);
  const { data } = useQuery<IMovieDetail>(["detail", `${id}`], () =>
    getMovie(id)
  );

  const closeModal = () => {
    setSelectedMovie(null);
    setModalIsOpen(false);
  };

  return (
    <Wrapper>
      <CloseButton onClick={closeModal}>X</CloseButton>
      <Cover
        style={{
          backgroundImage: `linear-gradient(transparent,rgba(255,255,255,0.4)), url(${makeBgPath(
            data?.backdrop_path || selectedMovie?.backdrop_path || ""
          )})`,
        }}
      />
      <Title>{data?.title}</Title>
      <OverView>{data?.overview}</OverView>
    </Wrapper>
  );
};

export default MovieDetail;
