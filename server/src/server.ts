import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes/index';
import cors from 'cors';
import log from './services/Logger';
import fileUpload from 'express-fileupload';
import { verifyToken } from './controllers/user.controller';




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
    mongoose.connect(process.env.MONGO_URI || "").then(() => {
    }).catch((e: any) => {
        log.error("Error connecting to the DB", e.message);
    });
});


log.http("Serving /hello");
log.data("Fetching user 01", "with extra info", "hello");
log.info("Succesful connection", "Continuing cycle", "Cycle complete")
log.test("Test log", "Testing Now...", "Testing succesful");
log.debug("This log is here", "Here", "And here...")
log.error("BIG ERROR OOF ASTLEY WAS HERE", "hello", "world");