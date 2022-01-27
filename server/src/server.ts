import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import mongoose from 'mongoose';

import router from './routes/index';
import log from './services/Logger';

dotenv.config();
const PORT = process.env.PORT || 5000;

log.OK('Reached Here');

const app: Express = express();

app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.post('/uploads', (request, response) => {
    if (request.files === null) {
        return response.status(400).json({ msg: 'No file uploaded' });
    }

    const file = request.files?.file as fileUpload.UploadedFile;
    const scrambledFileName =
        Math.floor(Math.random() * 1000).toString() + file.name;

    file?.mv(
        `${__dirname}/../../client/public/assets/${scrambledFileName}`,
        (error) => {
            if (error) {
                console.error(error);

                return response.status(500).send(error);
            }

            response.json({
                fileName: scrambledFileName,
                filePath: `/assets/${scrambledFileName}`,
            });
        }
    );
});

app.listen(PORT, () => {
    mongoose
        .connect(process.env.MONGO_URI || '')
        .then(() => {
            log.OK('Serving port', `${PORT.toString()}`);
            log.INFO('MONGO CONNECTED');
        })
        .catch((error: any) => {
            log.INFO('Error connecting to the DB', error.message);
        });
});
