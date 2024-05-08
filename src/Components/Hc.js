import { useState, useEffect } from "react";
import CardModal from "../Components/Modal";
import React from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Pagination,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "./movieContext";

function Hc() {
  const { data } = React.useContext(UserContext);
  const [moviePage, setMoviePage] = useState(1);
  const [movies, setMovies] = useState(data);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const moviesPerPage = 12;

  const lastMovie = moviePage * moviesPerPage;
  const firstMovie = lastMovie - moviesPerPage;

  const pageChange = (event, value) => {
    setMoviePage(value);
  };

  const openModal = (movie) => {
    // setSelectedMovie(movie);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmFhMzIyMTNlZTQ4NTIzOTM4MjY3YTE2YjFhNWU5YSIsInN1YiI6IjY2MzQ3ZWFhZmU2YzE4MDEyOTJmY2UwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GrK7x82WbpitfyN0fIg-MG11r8zMkErXr9E2Zhb8Pzo",
      },
    };

    async function fetchVideoData() {
      if (movie) {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;

        try {
          const response = await fetch(url, options);

          const data = await response.json();

          let a = data.results[0].key;
          // console.log(a);
          setSelectedMovie({ movie, a });
          // let x = movie.map((s) => console.log(s));
          console.log(movie);
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      }
    }
    fetchVideoData();
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const sortAsc = () => {
    const sortedMovies = [...movies].sort((a, b) =>
      a.original_title.localeCompare(b.original_title)
    );
    setMovies(sortedMovies);
  };

  const sortDes = () => {
    const sortedMovies = [...movies].sort((a, b) =>
      b.original_title.localeCompare(a.original_title)
    );
    setMovies(sortedMovies);
  };

  const home = () => {
    navigate("/home");
  };

  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmFhMzIyMTNlZTQ4NTIzOTM4MjY3YTE2YjFhNWU5YSIsInN1YiI6IjY2MzQ3ZWFhZmU2YzE4MDEyOTJmY2UwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GrK7x82WbpitfyN0fIg-MG11r8zMkErXr9E2Zhb8Pzo",
  //   },
  // };

  //   useEffect(() => {
  //     async function fetchVideoData() {
  //       if (selectedMovie) {
  //         const url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?language=en-US`;
  // // console.log(url);
  //         try {
  //           const response = await fetch(url, options);

  //           const data = await response.json();

  //           let a = data.results[0].key;
  //           console.log(a);
  //         } catch (error) {
  //           console.error("Error fetching video data:", error);
  //         }
  //       }
  //     }

  //     fetchVideoData();
  //   }, [selectedMovie, options]);

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient( to bottom,
        #c7e9fb ,
        #45b8ec,
        #1ea8e7 ,
        #45b8ec ,
        #0099e3 ,
        #0099e3
      )`,
          marginTop: "-10px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar home={home} sortAsc={sortAsc} sortDes={sortDes} />

        {selectedMovie && (
          <CardModal
            open={selectedMovie}
            close={closeModal}
            movie={selectedMovie}
          />
        )}

        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: "white",
            height: "20px",
            marginTop: "5px",
            width: "370px",
            borderRadius: "5px",
          }}
        />
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {/* .slice(firstMovie, lastMovie) */}
          {movies
            .filter((movie) => movie.title.toLowerCase().includes(search))
            .map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    "&:hover": {
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.9)",
                      cursor: "pointer",
                    },
                    borderRadius: "20px",
                    margin: "15px",
                    maxHeight: "420px",
                  }}
                  onClick={() => openModal(movie)}
                >
                  <CardMedia
                    component="img"
                    alt={movie.title}
                    sx={{ height: "300px", objectFit: "fill" }}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <CardContent sx={{ height: 80 }}>
                    <Typography variant="h6" gutterBottom>
                      Title: {movie.title}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Release Date: {movie.release_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* <Stack
          spacing={2}
          sx={{ mt: 5, justifyContent: "center", alignItems: "center" }}
        >
          <Pagination
            count={Math.ceil(movies.length / moviesPerPage)}
            page={moviePage}
            onChange={pageChange}
            color="primary"
          />
        </Stack> */}
      </div>
    </>
  );
}

export default Hc;
