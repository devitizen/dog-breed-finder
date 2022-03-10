import React from "react";
import $ from "jquery";
import * as tmImage from "@teachablemachine/image";
import breeds from "./breeds";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const TextMain = (props) => (
    <Typography sx={{ paddingY: 1, fontSize: 14 }}>{props.children}</Typography>
);

function Body() {
    const onClickHandler = (event) => {
        const input = event.target.files;
        if (input && input[0]) {
            $("#image-container").show();
            $("#spinner").show();
            $("#dog-image").show();
            $("#result-message").empty();
            $("#result-list").empty();

            var reader = new FileReader();
            reader.onload = function (e) {
                $("#dog-image").attr("src", e.target.result);
                $("#result").show();
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
        const dogImage = document.getElementById("dog-image");
        const result = await model.predict(dogImage, false);

        const prediction = result
                            .filter((element) => element.probability >= 0.001)
                            .sort((a, b) => b.probability - a.probability)
                            .slice(0, 5);

        const firstBreed = prediction[0].className;
        const firstRatio = prediction[0].probability;
        const isIdentified = firstRatio >= 0.5;
        let message;

        if (isIdentified) {
            message = firstBreed;
            makeListOfBreeds(prediction);

        } else {
            message = "Sorry, no idea what it is.";
        }

        $("#spinner").hide();
        $("#result-message").html(message);
    };

    const makeListOfBreeds = (prediction) => {
        for (let i = 0; i < prediction.length; i++) {
            let list = document.createElement("div");
            list.style.display = "grid";
            list.style.gridTemplateColumns = "1fr 1fr"
            list.style.marginTop = "12px";

            let name = document.createElement("div");
            name.style.gridColumn = 1;
            name.style.textAlign = "right";
            name.style.marginRight = "10px";
            let nameText = document.createTextNode(prediction[i].className);
            name.appendChild(nameText);
            list.appendChild(name);

            let bar = document.createElement("div");
            bar.style.gridColumn = 2;
            let ratio = document.createElement("div");
            ratio.classList.add("ratio");
            let number = Math.floor(prediction[i].probability * 10000) / 100;
            let ratioText = document.createTextNode(number.toFixed(1) + "%");
            ratio.appendChild(ratioText);
            ratio.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16) + "80";
            ratio.style.width = number + "%";
            ratio.style.border = "1px solid gray";
            ratio.style.borderRadius = "6px";
            ratio.style.paddingLeft = "10px";
            bar.appendChild(ratio);
            list.appendChild(bar);

            $("#result-list").append(list);
        }
    }


    return (
        <Container sx={{mx: "auto", width: "80%"}}>
            <Container sx={{ mt: 5 }}>
                <Typography
                    variant="h5"
                    sx={{mx: "auto", width: "100%", textAlign: "center", fontWeight: 600}}
                >
                    What kind of dog does it look like?
                </Typography>
                <Typography
                    sx={{mx: "auto", width: "100%", textAlign: "center", fontSize: 18, paddingTop: 2}}
                >
                    Find out dog's breed with its image.
                </Typography>
                <Box
                    sx={{mx: "auto", width: "100%", textAlign: "center", paddingTop: 2}}
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
                <Container 
                    sx={{ backgroundColor: "grey.100", display: "none", py: 6, borderRadius: 2, width: "70%" }} 
                    id="image-container"
                >
                    <Box 
                        sx={{ mx: "auto", width: "100%", textAlign: "center"}}
                        hidden
                        id="spinner"
                    >
                        <Typography>Identification is in progress...</Typography>
                        <CircularProgress sx={{my: 2}}/>
                    </Box>
                    <Box
                        sx={{ mx: "auto", width: "100%", textAlign: "center"}}
                    >
                        <img src="#" alt="dog" id="dog-image" hidden style={{maxWidth:500}}/>
                    </Box>
                    
                    <Box
                        sx={{ mx: "auto", width: "100%"}}
                        hidden
                        id="result"
                    >
                        <Typography 
                            variant="h5"
                            sx={{mx: "auto", width: "100%", textAlign: "center", fontWeight: 600, my: 3}}
                            id="result-message">
                        </Typography>
                        <Typography 
                            sx={{mx: "auto", width: "80%"}}
                            id="result-list"
                        >
                        </Typography>
                    </Box>
                </Container>
            </Container>

            <Container sx={{ mt: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <TextMain>
                        Dog Breed Finder takes advantage of the Google machine learning technology.
                    </TextMain>
                    <TextMain>
                        It will try to find a breed of dogs even though the selected image was not taken from dogs.
                    </TextMain>
                    <TextMain>
                        It can identify 60 breeds for now as follows.{" "}
                    </TextMain>
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
        </Container>
    );
}

export default Body;
