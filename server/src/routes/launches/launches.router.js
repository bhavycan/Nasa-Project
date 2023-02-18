const express = require('express')
const {  httpGetAllLaunches } = require('./launches.controller')
const {  httpAddNewLaunch } = require('./launches.controller')
const {  httpAbortLaunch } = require('./launches.controller')
const launchesRouter = express.Router()

launchesRouter.get('/',httpGetAllLaunches)
launchesRouter.post('/',httpAddNewLaunch)
launchesRouter.delete('/:id',httpAbortLaunch)
module.exports = launchesRouter