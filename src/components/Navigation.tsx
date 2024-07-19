import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  position: relative;
`;

const Links = styled.ul`
  display: flex;
  gap: 10px;
`;

const LinkItem = styled.li<{ $isMatch: boolean }>`
  padding: 5px;
  font-weight: bold;
  position: relative;
  border-radius: 10px;
  background-color: ${({ $isMatch }) => $isMatch && "rgba(0,0,0,0.1)"};
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: black;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 32px;
`;

const Divider = styled.span``;

const Navigation = () => {
  const popularMatch = useMatch("/");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");

  return (
    <Wrapper>
      <Links>
        <LinkItem $isMatch={Boolean(popularMatch)}>
          <Link to="/">Popular</Link>
          {popularMatch && <Circle layoutId="navCircle" />}
        </LinkItem>
        <Divider>|</Divider>
        <LinkItem $isMatch={Boolean(comingSoonMatch)}>
          <Link to="/coming-soon">Coming Soon</Link>
          {comingSoonMatch && <Circle layoutId="navCircle" />}
        </LinkItem>
        <Divider>|</Divider>
        <LinkItem $isMatch={Boolean(nowPlayingMatch)}>
          <Link to="/now-playing">Now Playing</Link>
          {nowPlayingMatch && <Circle layoutId="navCircle" />}
        </LinkItem>
      </Links>
    </Wrapper>
  );
};

export default Navigation;
