import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isModalOpenState, selectedMovieState } from "../atoms";
import { getMovie, makeBgPath } from "../api";
import { useQuery } from "react-query";
import { IMovieDetail } from "../types";

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: relative;
  min-width: 650px;
`;

const CloseButton = styled.div`
  padding: 5px 15px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  color: white;
  user-select: none;
  font-size: 25px;
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
  color: white;
  padding: 20px;
  font-size: 35px;
  position: relative;
  top: -90px;
  font-family: "Anton", sans-serif;
`;

const OverView = styled.p`
  padding: 20px;
  color: white;
  position: relative;
  font-size: 18px;

  top: -90px;
`;

const Info = styled.div`
  padding: 0 20px;
  color: white;
  position: relative;
  font-size: 18px;

  top: -90px;

  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MovieDetail = ({ id }: { id: string }) => {
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieState);
  const setModalIsOpen = useSetRecoilState(isModalOpenState);
  const { data, isLoading } = useQuery<IMovieDetail>(["detail", `${id}`], () =>
    getMovie(id)
  );

  const closeModal = () => {
    setSelectedMovie(null);
    setModalIsOpen(false);
  };

  return (
    <Wrapper>
      <CloseButton onClick={closeModal}>{"X"}</CloseButton>
      <Cover
        style={{
          backgroundImage: `linear-gradient(transparent,rgba(0,0,0,0.7)), url(${makeBgPath(
            data?.backdrop_path || selectedMovie?.backdrop_path || ""
          )})`,
        }}
      />
      {!isLoading && (
        <>
          <Title>{data?.title}</Title>
          <OverView>{data?.overview}</OverView>
          <Info>
            <div>Release Date: {data?.release_date}</div>
            <div>
              Runtime : {data?.runtime ? Math.floor(data?.runtime / 60) : ""}h{" "}
              {data?.runtime ? data?.runtime % 60 : ""}m
            </div>
            <div>
              Homepage :{" "}
              <a href={data?.homepage} target="blank">
                {data?.homepage}
              </a>
            </div>
            <div>
              Genres :{" "}
              {data?.genres.map((genre) => (
                <span key={genre.id}>{genre.name} </span>
              ))}
            </div>
          </Info>
        </>
      )}
    </Wrapper>
  );
};

export default MovieDetail;
