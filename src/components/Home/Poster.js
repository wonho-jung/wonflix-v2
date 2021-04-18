import React from "react";
import styled from "styled-components";

function Poster({ title, data }) {
  const url = "https://image.tmdb.org/t/p/original/";
  const handleClick = () => {};
  console.log(data);
  return (
    <PosterContainer>
      <h2>{title}</h2>
      <RowPosters>
        {data.data.results.map((data) => (
          <img
            key={data.id}
            onClick={() => handleClick(data)}
            src={`${url}${data.poster_path}`}
          />
        ))}
      </RowPosters>
    </PosterContainer>
  );
}

export default Poster;

const PosterContainer = styled.div`
  /* color: #fff; */
  margin-left: 20px;
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
