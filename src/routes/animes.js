// import { Router } from "express";
// import { promises as fs } from "fs";
// import { fileURLToPath } from "url";
// import path from "path";


// const routerAnime = Router();
// // const animeFilePath = path.join(__dirname, "../../data/animes.json");

// const _filename = fileURLToPath(import.meta.url); //archivo en un ruta absoluta convierte la ruta en una  ruta absoluta para que js la pueda enteder
// const _dirname = path.dirname(_filename);

// const animesFilePath = path.join(_dirname, "../../data/animes.json"); //Pasos adicionales para utilizar el fs

// const readAnimesFile = async () => {
//     const data = await fs.readFile(animesFilePath, "utf-8");
//     return JSON.parse(data);
// };

// const writeAnimeFs = async (animes) => {
//     fs.writeFile(animesFilePath, JSON.stringify(animes, null, 2));
// }

// Router.post("/postAnimes",(req,res) =>{

// });

// routerAnime.post("/postAnimes", async (req, res) => {
//     const animes = await readAnimesFile();
//     const newAnime = { id:animes.length + 1,
//         title : req.body.title,
//         genre: req.body.genre,}; 
//     animes.push(newAnime);
//     await writeAnimeFs(animes);
//     res.status(201).json(newAnime);
// });

// export default routerAnime;

import { Router } from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const routerAnime = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const animesFilePath = path.join(_dirname, "../../data/animes.json");

const readAnimesFile = async () => {
    try {
        const data = await fs.readFile(animesFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading animes file:', error);
        return [];
    }
};

const writeAnimeFs = async (animes) => {
    try {
        await fs.writeFile(animesFilePath, JSON.stringify(animes, null, 2));
    } catch (error) {
        console.error('Error writing animes file:', error);
        throw error;
    }
};

routerAnime.post("/postAnimes", async (req, res) => {
    try {
        const animes = await readAnimesFile();
        const newAnime = {
            id: animes.length + 1,
            title: req.body.title,
            genre: req.body.genre,
        };
        animes.push(newAnime);
        await writeAnimeFs(animes);
        res.status(201).json(newAnime);
    } catch (error) {
        console.error('Error handling postAnimes:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default routerAnime;
