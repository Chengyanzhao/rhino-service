const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const history = require('connect-history-api-fallback')
const logger = require('morgan')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const folderRouter = require('./routes/folder')
const fileRouter = require('./routes/file')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json()) // 数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })) // 解析post请求数据

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// history
app.use(history({
  verbose: false,
  index: '/',
  // rewrites: [
  //   { from: /\/from/, to: '/to' }
  // ]
}))

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/', indexRouter)
app.use('/folder', folderRouter)
app.use('/file', fileRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
