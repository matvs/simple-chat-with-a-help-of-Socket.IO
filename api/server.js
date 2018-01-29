var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require("mongoose")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mkdirp = require('mkdirp')
var multer = require("multer")
var fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = __dirname + '/app/files/' + req.body.to
        mkdirp(path, function(err){
            cb(err,path)
        })
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
var upload = multer({ storage: storage })

var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/frontend/static'))

//console.log(bcrypt.hashSync('abc123'))

var Message = require('./app/models/message')

var http = require('http').Server(app)
var io = require('socket.io')(http)
var userIdToSocketId = {

}

function authSocketUser(data,socket,callback){
	jwt.verify(data.token, "secret_key", function(err, decoded) {
		if(err) return
		if(decoded.id == data.user_id){
			callback(data)
		} else {
			socket.disconnect()
		}
	})
}
io.on('connection', function(socket){
    console.log('user connected')
    //console.log(socket)
    socket.on("user id", function(data){
		authSocketUser(data,socket,function(){
			userIdToSocketId[data.user_id] = socket.id
			io.emit("new_user_online",{user_id:data.user_id})
            io.to(socket.id).emit("people online", Object.keys(userIdToSocketId))
		 })
    })
    socket.on('send message', function(msg){
        authSocketUser(msg,socket,function(){
			if(userIdToSocketId.hasOwnProperty(msg.to)) {
            io.to(userIdToSocketId[msg.to]).emit('receive message', msg)

        }
		
        message = new Message()
        message.text = msg.text
        message.from = msg.from
        message.to = msg.to
        message.timestamp = Date.now()
        message.save(function(err){
            if(err)
                io.to(userIdToSocketId[msg.from]).emit('error sending message')
        })
		 })
    
    })

    socket.on('disconnect', function(){
        console.log('user disconnected')
        //console.log(userIdToSocketId)
        for(var key in userIdToSocketId){
            if(userIdToSocketId[key] == socket.id){
				io.emit("new_user_offline",{user_id:key})
                delete userIdToSocketId[key]
                break
            }
        }
        //console.log(userIdToSocketId)
    })
})

mongoose.connect('mongodb://localhost:27017/nppz').then(function(){
    console.log("DB connected")
}, function(err){
    console.log("COULD NOT CONNECT DB")
    console.log(err.message)
})

//mo1289_nppz:gA0G92Yhia7eRBq1xYEq
var router = express.Router()
app.use('/api', router)
router.get('/', function(req,res){
    res.json({message:'API ROOT'})
})

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    //res.header("Access-Control-Request-Method", "GET, POST, DELETE, PUT")
    next()
})
router.use(function(req, res, next){
    if(req.originalUrl == '/api/login/' || req.method == 'OPTIONS') {
        next()
    } else {
        var token = req.headers['authorization']
        if(!token){
            return res.status(401).send({message: "No token provided"})
        } else {
            jwt.verify(token.split(" ")[1], "secret_key", function(err, decoded) {
                if (err)
                    return res.status(500).send({message: "Ivalid token"});

                req.user_id = decoded.id
                next()
            });

        }
    }
})

var Bear = require('./app/models/bear')

router.route('/bears')
    .post(function(req,res) {
        var bear = new Bear()
        bear.name = req.body.name
        bear.save(function(err){
            if(err)
                res.send(err)
            res.json({message: 'Bear created'})
        })
    })
    .get(function(req,res){
        Bear.find(function(err, bears){
            if(err)
                res.send(err)
            res.json(bears)
        })
    })

router.route('/bears/:bear_id')
    .get(function(req,res){
        Bear.findById(req.params.bear_id,function(err, bear){
            if(err)
                res.send(err)
            res.json(bear)
        })
    })
    .put(function(req,res){
        Bear.findById(req.params.bear_id,function(err, bear){
            if(err)
                res.send(err)
            bear.name = req.body.name

            bear.save(function(err){
                if(err)
                    res.send(err)
                res.json({message: 'Bear updated'})
            })
        })
    })
    .delete(function(req,res){
        Bear.remove({
            _id : req.params.bear_id
        }, function(err,bear){
            if(err)
                res.send(err)
            res.json({message: 'Successfully deleted'})
        })
    })

var User = require('./app/models/user')
router.route('/login/')
    .post(function(req,res){
        User.find({
            login: req.body.login,
        },function(err, users){
            if(err)
                res.send(err)
            if(users.length > 0){
                var user = users[0]
                var isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
                if(isPasswordValid){
                    var token = jwt.sign({id: user._id}, "secret_key", {
                        expiresIn: 86400
                    })
                    res.json({token: token, user_id: user._id})
                } else {
                    res.status(200).json({message: 'Incorret password or username'})
                }
            } else{
                res.status(200).json({message: 'Incorret password or username'})
            }
        })
    })

router.route('/me')
    .get(function(req,res){
        User.find({
            _id: req.user_id,
        },function(err, users){
          if(users.length){
              res.json(users[0])
          } else {
              res.json({message: "No user found"})
          }

        })
    })

router.route('/users')
    .get(function(req,res){
        const name = req.query.name || ""
        User.find({login: new RegExp('^' + name,'i')},'login first_name second_name _id',{sort:{login:1}},function(err, users){
            if(users.length){
                res.json(users.filter(function(user){
                    return user._id != req.user_id
                }))
            } else {
                res.json({message: "No users found"})
            }

        })
    })

router.route('/messages/:from/:to')
    .get(function(req,res){
        Message.find({from: new RegExp(req.params.from + '|' + req.params.to), to: new RegExp(req.params.from + '|' + req.params.to)},'text from to',{sort:{timestamp:1}},function(err, messages){
           if(err) res.send(err)
            res.json(messages)

        })
    })


File = require('./app/models/file')	
router.route('/upload')
	.post(upload.single("file"), function(req,res,next){
			const file = req.file
            file_db = new File()
        array file_db.name = file.filename
            file_db.from = req.body.from
            file_db.to = req.body.to
            file_db.save(function(err){
					if(err)
						return res.send(err)
                    res.json({message: "File uploaded"})
			})
			})


router.route('/files/sent')
	.get(function(req,res){
		File.find({from: req.user_id}, function(err, files){
			if(err)
				res.send(err)
			res.json({type: 'sent',files})
		})
	})

router.route('/files/received')
	.get(function(req,res){
		File.find({to: req.user_id}, function(err, files){
			if(err)
				res.send(err)
			res.json({type: 'received',files})
		})	
	})		
	
router.route('/downloadfile/:from/:to/:name').get(function(req,res){
	//const data = req.originalUrl.split('/')
	if(req.user_id == req.params.to || req.user_id == req.params.from){
		var file = fs.readFileSync(__dirname + '/app/files/' + req.params.to + '/' + req.params.name)
        res.end(file,'binary')
	}
})	
//router.use('downloadfile', express.static(__dirname + '/app/files'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(function(req, res,next){
    if(req.originalUrl.indexOf('api') == -1){
        if(req.originalUrl.indexOf('favicon.ico') !== -1){
            var img = fs.readFileSync(__dirname + '/frontend/favicon.ico')
            //res.writeHead(200, {'Content-Type': 'image/gif' });
            res.end(img, 'binary')
        }else{
            res.render(__dirname + '/frontend/index.html')
        }
    }

	next()	
  });


var port = process.env.PORT || 8082
http.listen(port, function(){
    console.log("Listening on port: " + port)
})
