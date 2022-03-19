import React, {useState} from "react";
import {render, unmountComponentAtNode} from 'react-dom';
import * as tmImage from "@teachablemachine/image";
import breeds from "./data";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid';


function Body() {

    const [showResultContainer, setShowResultContainer] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const onClickHandler = (event) => {
        const input = event.target.files;
        if (input && input[0]) {
            setShowResultContainer(true);
            setShowSpinner(true);

            const resultMessage = document.getElementById("result-message");
            if (resultMessage != null)
                resultMessage.innerHTML = "";
                
            const resultList = document.getElementById("result-list");
            if (resultList != null)
                unmountComponentAtNode(resultList);

            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("dog-image").setAttribute("src", e.target.result);
            };
            reader.readAsDataURL(input[0]);

            init().then(() => predict());
        }
    };

    // the link to your model provided by Teachable Machine export panel
    const URL = "./models/";
    let model;

    // Load the image model and setup the webcam
    const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        model = await tmImage.load(modelURL, metadataURL);
    };

    const predict = async () => {
        const result = await model.predict(document.getElementById("dog-image"), false);

        const breeds = result
                        .filter((element) => element.probability >= 0.001)
                        .sort((a, b) => b.probability - a.probability)
                        .slice(0, 5);

        let message;
        const isIdentified = breeds[0].probability >= 0.5;
        if (isIdentified) {
            message = breeds[0].className;

            const list = breeds.map(getList);
            render(list, document.getElementById("result-list"));

        } else {
            message = "Sorry, no idea what it is.";
        }

        setShowSpinner(false);
        document.getElementById("result-message").innerHTML = message;
    };

    const getList = (breed, i) => {
        const name = breed.className;
        const rate = Math.floor(breed.probability * 10000) / 100;
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16) + "80";

        return (
            <Grid container key={i} >
                <Grid item xs={12} sm={6}>
                    <Typography 
                        sx={{textAlign: [null, "right", null]}} 
                    >
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{mb: "16px"}}>
                    <Typography 
                        sx={{
                            backgroundColor: randomColor, 
                            width: rate + "%", 
                            border: "1px solid gray",
                            borderRadius: 1,
                            pl: 1,
                            ml: [0, 1, 2]
                        }}
                    >
                        {rate.toFixed(1) + "%"}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    const Description = (props) => (
        <Typography sx={{ paddingY: 1, fontSize: 14 }}>{props.children}</Typography>
    );


    return (
        <div>
            <Container sx={{ mt: 5 }}>
                <Typography
                    variant="h5"
                    sx={{textAlign: "center", fontWeight: 600}}
                >
                    What kind of dog does it look like?
                </Typography>
                <Typography
                    sx={{textAlign: "center", fontSize: 18, paddingTop: 2}}
                >
                    Find out dog's breed with its image.
                </Typography>
                <Box
                    sx={{textAlign: "center", paddingTop: 2}}
                >
                    <label>
                        <input accept="image/*" type="file" hidden onChange={onClickHandler}/>
                        <Button variant="contained" size="large" component="span">
                            Click for Image
                        </Button>
                    </label>
                </Box>
            </Container>
           
            <Container sx={{ mt: 5 }}>
                { showResultContainer ? 
                    <Container sx={{ backgroundColor: "grey.100", py: 4, borderRadius: 2 }} >
                        { showSpinner ?
                            <Box sx={{ mx: "auto", width: "100%", textAlign: "center"}} >
                                <Typography>Identification is in progress...</Typography>
                                <CircularProgress sx={{my: 2}}/>
                            </Box>
                            : null
                        }

                        <Box sx={{ textAlign: "center"}}>
                            <img 
                                src="#" alt="dog" id="dog-image" 
                                style={{maxWidth: "90%", maxHeight: "500px" }}/>
                        </Box>
                        
                        <Box sx={{ mx: "auto", width: ["90%", "100%", "70%"]}} >
                            <Typography 
                                sx={{textAlign: "center", fontSize: 18, fontWeight: 600, my: 3}}
                                id="result-message"
                            >
                            </Typography>
                            <Box
                                sx={{fontSize: 14}}
                                id="result-list"
                            >
                            </Box>
                        </Box>
                    </Container>
                    : null 
                }
            </Container>

            <Container sx={{ mt: 5 }}>
                <Box sx={{ mx: 2 }}>
                    <Description>
                        Dog Breed Finder takes advantage of the Google machine learning technology.
                    </Description>
                    <Description>
                        It will try to find a breed of dogs even though the selected image was not taken from dogs.
                    </Description>
                    <Description>
                        It can identify 60 breeds for now as follows.{" "}
                    </Description>
                </Box>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#1976d2" }}>
                            Click here to check what breeds are available.
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ fontSize: 14 }}>
                            {breeds}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </div>
    );
}

export default Body;