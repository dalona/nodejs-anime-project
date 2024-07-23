import { Router } from "express";
import {promises as fs} from 'fs';
import { fileURLToPath } from "url";
import path from 'path';

const routerStudios = Router();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const studioFilePath = path.join (_dirname, '../../data/studios.json');

const readStudiosFs = async () => {
    try{
        const studios = await fs.readFile(studioFilePath)
        return JSON.parse(studios);
    }catch(err){
        throw new Error(`Error en la promesa ${err}`)
    }
};

const writeStudiosFs = async (studios) => {
    await fs.writeFile(studioFilePath, JSON.stringify(studios, null, 2))
};

routerStudios.post("/", async (req, res) => {
    const studios = await readStudiosFs();
    const newStudio = {
        id: studios.length + 1,
        name: req.body.name
    };

    studios.push(newStudio);
    await writeStudiosFs(studios);
    res.status(201).send(`Studio created successfully ${JSON.stringify(newStudio)}`);
});



routerStudios.get("/", async (req,res) =>{
    const studios = await readStudiosFs();
    res.json(studios);
})


routerStudios.get("/:studioId", async (req,res) =>{
    const studios = await readStudiosFs();
    const studio = studios.find(studio => studio.id == req.params.studioId);
    if(!studio) return res.status(404).send("Studio not found");
    res.json(studio)
})

routerStudios.put("/:studioId", async (req, res) =>{
    const studios = await readStudiosFs();
    const indexStudio = studios.findIndex(studio => studio.id == req.params.studioId);
    if(indexStudio === -1) return res.status(404).send("Studio not found");
    studios[indexStudio].name = req.body.name;
    await writeStudiosFs(studios);
    res.send(`Studio updated successfully ${JSON.stringify(studios[indexStudio])}`)
})





export default routerStudios;