import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import nopost from "../../assets/noPosterSmall.png";
function Poster({ id, imageUrl, title, rating, year, isMovie = false }) {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <PosterContainer>
        <ImageContainer>
          <Image
            bgUrl={
              imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : nopost
            }
          />
          <Rating>
            <span role="img" aria-label="rating">
              ⭐️
            </span>{" "}
            {rating}/10
          </Rating>
        </ImageContainer>
        <Title>
          {title.length > 15 ? `${title.substring(0, 15)}...` : title}
        </Title>
        <Year>{year}</Year>
      </PosterContainer>
    </Link>
  );
}

export default Poster;
const PosterContainer = styled.div`
  font-size: 12px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 4px;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px;
  img {
    object-fit: contain;
    border-radius: 4px;
    height: 180px;
    width: 100%;
    max-height: 180px;
    margin-right: 10px;
    transition: transform 450ms;
    :hover {
      transform: scale(1.08);
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
