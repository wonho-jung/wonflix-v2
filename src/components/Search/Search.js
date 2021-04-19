import React, { useState } from "react";
import styled from "styled-components";
import { MoivesApi, tvApi } from "../../api";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import Poster from "../Poster/Poster";
import Section from "../Section/Section";

function Search() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input !== "") {
      searchByTerm();
    }
  };
  const searchByTerm = async () => {
    try {
      setLoading(true);

      const movieResults = await MoivesApi.search(input);
      const tvResults = await tvApi.search(input);
      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  };
  console.log(movieResults?.data?.results, tvResults?.data?.results);

  return (
    <SearchContainer>
      <SearchContent />
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
      </Form>
      {loading ? (
        <Loading />
      ) : (
        <Results>
          {movieResults && movieResults.data?.results.length > 0 && (
            <Section title="Movie Results">
              {movieResults.data.results.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date?.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.data?.results.length > 0 && (
            <Section title="TV Show Results">
              {tvResults.data?.results.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date?.substring(0, 4)}
                />
              ))}
            </Section>
          )}

          {movieResults.data?.results.length === 0 &&
            tvResults.data?.results.length === 0 && <Message />}
        </Results>
      )}
    </SearchContainer>
  );
}

export default Search;
const SearchContainer = styled.div`
  background-color: rgb(20, 20, 20);
  min-height: 100vh;
  width: 100%;
`;
const Results = styled.div`
  padding: 20px;
`;
const SearchContent = styled.div`
  padding-top: 80px;
`;
const Form = styled.form`
  margin-left: 20px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;
