// ライブラリ読み込み
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
const app = express();
app.use(helmet());
app.use(cors());
const bodyParser = require('body-parser');

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // port番号を指定

app.get('/helloWorld', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
})

// ルーティング
const router = require('./routes/');
app.use('/', router);

// サーバ起動
app.listen(port);
console.log('listen on port' + port);

// mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect('mongodb://localhost:27017/app1db', options);
mongoose.connection.on('error', function (err: any) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
})