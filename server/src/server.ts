import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes/index';
import cors from 'cors';
import log from './services/Logger';
import fileUpload from 'express-fileupload';




dotenv.config();
const PORT = process.env.PORT || 5000;


const app: Express = express();
app.use(fileUpload())
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use("/api", router);

app.post('/uploads', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files?.file as fileUpload.UploadedFile;

    file?.mv(`${__dirname}/../../client/public/assets/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/assets/${file.name}` });
    });
});



app.listen(PORT, () => {
    log.info(`Listening on http://localhost:${PORT}`)
    mongoose.connect(process.env.MONGO_URI || "").then(() => {
        log.info("Connected to the database")
    }).catch((e: any) => {
        log.veryBigNetworkError("Error connecting to the DB", e.message)
    });
});
