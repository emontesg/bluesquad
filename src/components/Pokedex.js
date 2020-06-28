import React from "react";
import { useDebounce } from "use-debounce";

import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotFound from "@material-ui/icons/SentimentVeryDissatisfied";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LeftArrow from "@material-ui/icons/KeyboardArrowLeft";
import RightArrow from "@material-ui/icons/KeyboardArrowRight";

import { getPokemon } from "../api/pokemons";

const MAX_POKEMONS = 807;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.light,
    borderRightWidth: 6,
    borderStyle: "solid",
    borderBottomWidth: 6,
    borderWidth: 0,
    borderRadius: theme.spacing(1),
    flex: "auto",
    marginTop: -3,
    padding: theme.spacing(4),
  },
  screen: {
    alignItems: "center",
    backgroundColor: "#81d4fa",
    borderColor: "#b3e5fc",
    borderRightWidth: 3,
    borderStyle: "solid",
    borderBottomWidth: 3,
    borderWidth: 0,
    borderRadius: theme.spacing(0.5),
    display: "flex",
    height: 200,
    justifyContent: "center",
  },
  image: {
    height: 160,
    width: "auto",
  },
  info: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: theme.spacing(0.5),
    display: "flex",
    flex: "auto",
    flexDirection: "column",
    height: 400,
    marginTop: theme.spacing(2),
    overflow: "scroll",
    padding: theme.spacing(2),
  },
}));

function Pokedex({ pokemon, setPokemon }) {
  const styles = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [search, setSearch] = React.useState("");
  const [debouncedSearch] = useDebounce(search, 250);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setData(await getPokemon(pokemon));
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemon]);

  React.useEffect(() => {
    setPokemon(debouncedSearch.toLowerCase() || 1);
  }, [debouncedSearch]);

  const handlePrevious = React.useCallback(() => {
    setPokemon(data.id - 1);
  }, [setPokemon, data]);

  const handleNext = React.useCallback(() => {
    setPokemon(data.id + 1);
  }, [setPokemon, data]);

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Typography ml="auto">Test - Bluesquad</Typography>
      <Box
        ml="auto"
        mr={1}
        borderRadius={4}
        bgcolor="#000"
        width={50}
        height={6}
      />
      <Paper elevation={4} className={styles.root}>
        <Paper variant="outlined" className={styles.screen}>
          {isLoading ? (
            <CircularProgress />
          ) : data ? (
            <img src={data.sprites.front_default} className={styles.image} />
          ) : error ? (
            <NotFound fontSize="large" color="disabled" />
          ) : null}
        </Paper>

        <Box mt={2} display="flex" alignItems="center">
          <Box>
            <IconButton
              size="small"
              color="primary"
              disabled={!data || data?.id === 1}
              onClick={handlePrevious}
            >
              <LeftArrow fontSize="large" />
            </IconButton>
          </Box>
          <Box ml={1} mr={2}>
            <IconButton
              size="small"
              color="primary"
              disabled={!data || data?.id === MAX_POKEMONS}
              onClick={handleNext}
            >
              <RightArrow fontSize="large" />
            </IconButton>
          </Box>

          <FormControl fullWidth hiddenLabel variant="filled">
            <FilledInput
              disableUnderline
              fullWidth
              margin="dense"
              label="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              endAdornment={
                <InputAdornment>
                  {search ? (
                    <IconButton
                      onClick={() => setSearch("")}
                      size="small"
                      color="inherit"
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : (
                    <SearchIcon />
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <Paper className={styles.info} elevation={2}>
          {!isLoading && data ? (
            <React.Fragment>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="overline" color="textSecondary">
                  #{data.id}
                </Typography>
                <Typography variant="overline">{data.name}</Typography>
              </Box>

              <Box mt={2}>
                <LineText title="Weight" text={data.weight} />
                <LineText title="Height" text={data.height} />
              </Box>
            </React.Fragment>
          ) : null}
        </Paper>
      </Paper>
    </Container>
  );
}
function LineText({ title, text }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="overline" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="overline">{text}</Typography>
    </Box>
  );
}
export default Pokedex;
