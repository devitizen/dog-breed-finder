import React, { useState, useEffect, useRef } from "react";

import { findAll } from "../services/connect";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';


function Search() {
    const [allBreeds, setAllBreeds] = useState([]);
    const [criteria, setCriteria] = useState(10);
    const [keyword, setKeyword] = useState("");
    const [showTopButton, setShowTopButton] = useState(false); 

    const cardHeight = 200;
    const cardMaxWidth = 456;
    const topButtonThread = 80;
    const mySkeletons = Array(12).fill(null);

    const isDataLoaded = useRef(false);
    const searchedBreeds = useRef(0);

    useEffect(() => {
        loadData();
        isDataLoaded.current = true;
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);

    const loadData = async () => {
        const data = await findAll().then((res) => res.data);
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        searchedBreeds.current = sortedData;
        setAllBreeds(sortedData);
    }

    const criteriaChangeHandler = (event) => {
        const newCriteria = event.target.value;
        updateSearchedBreeds(newCriteria, keyword);
        setCriteria(newCriteria);
    }

    const keywordChangeHandler = (event) => {
        const newKeyword = event.currentTarget.value.trim().toLowerCase();
        updateSearchedBreeds(criteria, newKeyword);
        setKeyword(event.currentTarget.value.trim().toLowerCase()); 
    }

    const clearClickHandler = () => {
        document.getElementById("keywordTF").value = "";
        updateSearchedBreeds(criteria, "");
        setKeyword("");
    }

    const updateSearchedBreeds = (criteria, keyword) => {
        searchedBreeds.current = 
            allBreeds
                .filter(b => {
                    switch (criteria) {
                        case 10:
                            return b.name.toLowerCase().includes(keyword);
                        case 20:
                            return b.description.toLowerCase().includes(keyword);
                        default:
                            return true;
                    }
                });
    }

    const scrollHandler = (event) => {
        const location = event.currentTarget.scrollY;
        if (location > topButtonThread) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    const topButtonClickHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


    return (
        <Container sx={{ mt: 5 }}>
            { showTopButton ? 
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{display: "block", position : "fixed", bottom: "6%", right: "6%"}}
                    id="topButton"
                    onClick={topButtonClickHandler}
                >
                    Top
                </Button>
                :
                null
            }

            <Box  sx={{ display: "flex", justifyContent: "center" }} >
                <Box
                    sx={{
                        width: ["100%", "80%", "60%"],
                        maxWidth: [cardMaxWidth, 600],
                        mb: 5,
                    }}
                >
                    <Stack direction="row">
                        <Box sx={{ mr: 1 }}>
                            <FormControl fullWidth>
                                <Select
                                    value={criteria}
                                    onChange={criteriaChangeHandler}
                                    autoWidth
                                    sx={{color: "gray"}}
                                >
                                    <MenuItem value={10}>Name</MenuItem>
                                    <MenuItem value={20}>Details</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField fullWidth autoFocus
                            label="Enter a keyword" 
                            onChange={keywordChangeHandler}
                            id="keywordTF"
                        />
                        <Button 
                            variant="outlined"
                            sx={{ color: "#C5C5C5", borderColor: "#C5C5C5"}}
                            onClick={clearClickHandler}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ mb: 2, color: "gray", fontSize: 14}}>
                Searched {searchedBreeds.current.length}
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    { isDataLoaded.current ?
                        searchedBreeds.current
                            .map((breed, index) => (
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <MediaCard
                                        name={breed.name}
                                        description={breed.description}
                                        url={breed.url}
                                        imgPath={breed.img_path}
                                        height={cardHeight}
                                        cardMaxWidth={cardMaxWidth}
                                    />
                                </Grid>
                            ))
                        :
                        mySkeletons.map((_, key) => (
                            <Grid item xs={4} sm={4} md={4} key={key}>
                                <Skeleton 
                                    variant="rectangular"
                                    animation="wave" 
                                    sx={{maxWidth: cardMaxWidth, height: cardHeight*2}}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Container>
    );
}

export default Search;

function MediaCard(props) {
    return (
        <Card sx={{ maxWidth: props.cardMaxWidth}}>
            <CardMedia
                component="img"
                height={props.height}
                image={"images/featured/" + props.imgPath}
                alt={props.name}
            />
            <CardContent>
                <Box sx={{ fontSize: 18, fontWeight: 500, marginBottom: 1 }}>
                    {props.name}
                </Box>
                <Box sx={{ fontSize: 14, color: "gray" }}>
                    {props.description}
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    sx={{ marginLeft: "5px" }}
                    onClick={() => {
                        window.open(props.url);
                    }}
                >
                    Wikipedia
                </Button>
            </CardActions>
        </Card>
    );
}
