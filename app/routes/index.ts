import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { TestService } from '../services/TestService';
import { TestMongoService } from "../services/TestMongoService";

const app = express();
app.use(helmet());
app.use(cors());
// ルーティングする
const router = express.Router();

// routerにルーティングの動作を記述する
router.get('/helloWorld', (req, res) => {
    res.status(200).send({ message: 'Hello, World!' });
})

router.get('/test', (req, res, next) => {
    const service = new TestService();
    service
        .test()
        .then(result => res.status(200).send(result))
        .catch(next);
});

// いずれのルーティングにもマッチしない
app.use((req, res) => {
    res.status(404);
    res.render('error', {
        param: {
            status: 404,
            message: 'not found'
        },
    });
});

// routerをモジュールとして扱う準備
module.exports = router;

router.get('/test/mongo/:user', (req, res, next) => {
    const { user } = req.params;
    const service = new TestMongoService();

    service
        .run(user)
        .then(result => res.status(200).send(result))
        .catch(next);
});