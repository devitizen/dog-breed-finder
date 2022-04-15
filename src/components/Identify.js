import React, {useState} from "react";
import { createRoot } from 'react-dom/client';

import * as tmImage from "@teachablemachine/image";
import breeds from "../data/breeds";
import { findByName } from "../services/connect"

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid';


function Identify() {

    const [showResultContainer, setShowResultContainer] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const onClickHandler = (event) => {
        const input = event.target.files;
        if (input && input[0]) {
            setShowResultContainer(true);
            setShowSpinner(true);

            // delete the previous result
            const resultName = document.getElementById("result-name");
            if (resultName != null)
                resultName.innerHTML = "";

            const resultDescription = document.getElementById("result-description");
            if (resultDescription != null) {
                const rootResultDescription = createRoot(resultDescription);
                rootResultDescription.unmount();
            }
                
                
            const resultList = document.getElementById("result-list");
            if (resultList != null) {
                const rootResultList = createRoot(resultList);
                rootResultList.unmount();
            }
                

            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("dog-image").setAttribute("src", e.target.result);
            };
            reader.readAsDataURL(input[0]);

            init().then(() => predict());
        }
    };

    // the link to your model provided by Teachable Machine export panel
    const URL = "./models/v3.1/";
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
        
        const isIdentified = breeds[0].probability >= 0.5;
        let breedName;
        if (isIdentified) {
            breedName = breeds[0].className.trim();
            const breed = await findByName(breedName)
                                .then(res => res.data);
            
            const rootDescription = createRoot(document.getElementById("result-description"));
            const description = makeDescription(breed);
            rootDescription.render(description);

            const rootList = createRoot(document.getElementById("result-list"));
            const list = breeds.map(makeList);
            rootList.render(list);
        } else {
            breedName = "Sorry, no idea what it is.";
        }

        setShowSpinner(false);
        document.getElementById("result-name").append(breedName);
    };

    const makeDescription = (breed) => {
        return (
            <Box sx={{my: 3}}>
                {breed.description} 
                <a href={breed.url} target="_blank" rel="noreferrer" 
                   style={{textDecoration: "none", fontWeight: 500, marginLeft: "10px", color: "#1769aa"}}
                >
                    Wikipedia
                </a>
            </Box>
        );
    }
        
    const makeList = (breed, i) => {
        const name = breed.className;
        const rate = Math.floor(breed.probability * 10000) / 100;
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16) + "80";

        return (
            <Grid container key={i} sx={{ pt: 2 }} >
                <Grid item xs={12} sm={6}>
                    <Box 
                        sx={{textAlign: [null, "right", null]}} 
                    >
                        {name}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{mb: "16px"}}>
                    <Box 
                        sx={{
                            backgroundColor: randomColor, 
                            width: rate + "%", 
                            border: "1px solid gray",
                            borderRadius: 1,
                            pl: 1,
                            ml: [0, 1, 2],
                        }}
                    >
                        {rate.toFixed(1) + "%"}
                    </Box>
                </Grid>
            </Grid>
        );
    };


    return (
        <div>
            <Container sx={{ mt: 5 }}>
                <Box sx={{textAlign: "center", fontSize: 20, fontWeight: 600}}>
                    What kind of dog does it look like?
                </Box>
                <Box sx={{textAlign: "center", fontSize: 16, paddingTop: 2}}>
                    Find out dog's breed with its image.
                </Box>
                <Box sx={{textAlign: "center", paddingTop: 2}}>
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
                            <Box
                                sx={{ mx: "auto", width: "100%", textAlign: "center"}}
                            >
                                <Button>In progress ...</Button>
                                <Box sx={{my: 2}}>
                                    <CircularProgress />
                                </Box>
                            </Box>
                            : null
                        }
                        <Box sx={{ textAlign: "center"}}>
                            <img 
                                src="#" alt="dog" id="dog-image" 
                                style={{maxWidth: "90%", maxHeight: "500px" }}/>
                        </Box>
                        <Box sx={{ mx: "auto", width: ["90%", "100%", "70%"]}} >
                            <Box 
                                sx={{textAlign: "center", fontSize: 18, fontWeight: 600, my: 3}}
                                id="result-name"
                            >
                            </Box>
                            <Box id="result-description"></Box>
                            <Box id="result-list"></Box>
                        </Box>
                    </Container>
                    : null 
                }
            </Container>

            <Container sx={{ mt: 5 }}>
                <Box sx={{ mx: 2 }}>
                    <Box sx={{ paddingY: 1, fontSize: 14 }}>
                        Dog Breed Finder takes advantage of the Google machine learning technology.<br/><br/>
                        It will try to find a breed of dogs even if the selected image is not taken from dogs.<br/><br/>
                        It can identify 60 breeds for now as follows.<br/>
                    </Box>
                </Box>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box sx={{ fontSize: 14, fontWeight: 500, color: "#1976d2" }}>
                            Click here to check what breeds are available.
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ fontSize: 14 }}>
                            {breeds}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </div>
    );
}

export default Identify;