import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import firebaseAdmin from 'firebase-admin';
import {
  authorRouter,
  bookRouter,
  roleRouter,
  userRouter,
} from './routers'
import { categoryRouter } from './routers/category';
dotenv.config()

let db = require('./config/database/db')
let serviceAccountKey = require('./config/firebase/serviceAccountKey.json');
class App {
  public express: express.Application
  public constructor() {
    this.express = express()
    this.middlewares()
    this.database()
    this.firebaseAdminConfig();
    this.main_routes()
    this.system_router()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(
      '/files',
      express.static(path.resolve(__dirname, 'tmp', 'uploads')),
    )
    this.express.use(express.urlencoded({ extended: false }))
  }
  private database(): void {
    db(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    )
  }
  private firebaseAdminConfig(): void {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccountKey)
    });
  }
  private system_router(): void {
    this.express.use(userRouter);
    this.express.use(roleRouter);
    this.express.use(bookRouter);
    this.express.use(authorRouter);
    this.express.use(categoryRouter);
  }
  private main_routes(): void {
    this.express.get('/', (_req, res) => {
      res.send(`
				 <body style="display:flex;justify-content: center; flex-direction: column; align-items: center;background-color:black;color:black;text-align:center;padding:30px; font-size:40pt;">
				<h2  style="color:#008bd0;text-align:center;padding:30px; font-size:40pt;">Seja bem-vindo.</h2>
					<p style="color:#fff;text-align:center;padding:20px; font-size:20pt;">A nossa api tem como objectivo ajudar no crescimento do país com base os pagamentos de propínas e de serviços escolares nas universidades, institutos e colegios <a href="/doc">Acessa a nossa documentação</a></p>
				</body>
		`)
    })
  }
}

export default new App().express
