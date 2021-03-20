import 'reflect-metadata'
import express from 'express'
import './database/connect';
import routes from './routes/routes'

const app = express()

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

app.listen(3333, () => console.log('Sever started at http://localhost:3333'))