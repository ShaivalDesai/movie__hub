import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Modal,
  Typography,
  Box,
  CardMedia,
  CardContent,
  Button,
  Icon,
} from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const CardModal = ({ open, close, movie }) => {
  console.log(movie.a);
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={close}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
            maxHeight: "80%",
          }}
        >
          <CardMedia
            component="img"
            alt={movie.title}
            sx={{ maxHeight: "330px", objectFit: "fill" }}
            image={`https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`}
          />
          <CardContent>
            <Typography style={{ fontSize: "20px" }}>
              Title: {movie.movie.title}
            </Typography>
            <Typography style={{ fontSize: "18px" }} color="red">
              Release Date: {movie.movie.release_date}
            </Typography>
            <Typography style={{ fontSize: "18px" }}>
              Popularity: {movie.movie.popularity}
            </Typography>
            {/* <Typography style={{fontSize:"15px"}} >
              Overview: {movie.movie.overview}
            </Typography> */}
            <Typography>
              <Button
                variant="contained"
                startIcon={<YouTubeIcon />}
                href={`https://www.youtube.com/watch?v=${movie.a}`}
              >
                Trailer
              </Button>
            </Typography>
          </CardContent>
        </Box>
      </Fade>
    </Modal>
  );
};
// {`https://www.youtube.com/watch?v={key}`}
CardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
};

export default CardModal;
