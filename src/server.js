import express from 'express'
import setupMiddware from './middleware'
import { restRouter } from './api'
import { connect } from './db'
import { signin, protect } from './api/modules/auth'
import { graphqlRouter } from './api/graphQLRouter';
// Declare an app from express
const app = express()

setupMiddware(app)
connect()
// setup basic routing for index route

app.use('/signin', signin)
app.use('/api', protect, restRouter)
app.use('/graphql', graphqlRouter)
app.use('/docs', graphqlExpress({ endpointURL: '/graphql' }))
// catch all
app.all('*', (req, res) => {
  res.json({ok: true})
})

export default app
