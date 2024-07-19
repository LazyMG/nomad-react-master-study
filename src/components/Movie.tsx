import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../api";

const Wrapper = styled.div`
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
`;

const Movie = ({
  id,
  title,
  img,
}: {
  id: number;
  title: string;
  img: string;
}) => {
  const navigate = useNavigate();

  const gotoMovieDetail = (id: number) => {
    navigate(`/movies/${id}`);
  };
  return (
    <Wrapper onClick={() => gotoMovieDetail(id)}>
      <Image src={makeImagePath(img)} />
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Movie;
