import styled from "styled-components";

const Div = styled.div`
  border-radius: 1rem;
  background-color: coral;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
  position: relative;
  z-index: 1;
  background-color: ${({ $bg_color }) => ($bg_color ? $bg_color : "white")};
`;

const Sticker = styled.div`
  border: unset;
  display: inline-block;
  padding: 0.1rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $sticker_color }) => ($sticker_color ? $sticker_color : "white")};
  border-radius: 1rem;
  background-color: ${({ $sticker_bg }) =>
    $sticker_bg ? $sticker_bg : "purple"};
`;

const OverlayImage = styled.div`
  border-radius: 1rem;
  position: absolute;
  background-image: ${({ $overlayImg }) => {
    console.log($overlayImg);
    return $overlayImg ? `url(${$overlayImg})` : "none";
  }};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: 700;
  z-index: 999;
  color: ${({ $content_color }) => ($content_color ? $content_color : "black")};

  @media (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 800;
    z-index: 999;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

// eslint-disable-next-line no-unused-vars
const StickerOverlayCard = ({
  title,
  sticker_bg,
  sticker_color,
  bg_color,
  overlayImg,
  content,
  content_color,
}) => {
  return (
    <Div $bg_color={bg_color}>
      <OverlayImage $overlayImg={overlayImg}></OverlayImage>
      <Sticker $sticker_bg={sticker_bg} $sticker_color={sticker_color}>
        {title}
      </Sticker>
      <Content $content_color={content_color}>{content}</Content>
    </Div>
  );
};

export default StickerOverlayCard;
