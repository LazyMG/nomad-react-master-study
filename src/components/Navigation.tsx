import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { lightThemeState } from "../atoms";

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
  align-items: center;
`;

const LinkItem = styled.li<{ $isMatch: boolean }>`
  padding: 5px 10px;
  font-weight: bold;
  position: relative;
  border-radius: 10px;
  background-color: ${(props) => (props.$isMatch ? props.theme.pointBg : "")};

  color: ${(props) => props.theme.textColor};

  &:hover {
    background-color: ${(props) =>
      props.$isMatch ? "" : props.theme.hoverColor};
  }
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColor};
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 32px;
`;

const Divider = styled.span`
  color: ${(props) => props.theme.textColor};
`;

const ThemeButton = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  font-size: 22px;
  user-select: none;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Navigation = () => {
  const popularMatch = useMatch("/");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");
  const [isLightTheme, setIsLightTheme] = useRecoilState(lightThemeState);

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
      <ThemeButton onClick={() => setIsLightTheme((prev) => !prev)}>
        {isLightTheme ? "☀️" : "🌙"}
      </ThemeButton>
    </Wrapper>
  );
};

export default Navigation;
