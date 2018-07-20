module.exports = auth;


function auth(app, Users, rndstring, multer, path, Social){
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req,file,cb)=>{
        cb(null, '/root/meouk/sunrintonServer/public/image'); // /root/meouk/sunrintonServer/Sign_baseServer/
      },
      filename: (req,file,cb)=>{
        var newStr = rndstring.generate(33);
        newStr = newStr + ".PNG"
        cb(null, newStr);
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });
  app.post('/signup', async(req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(25);
    var result = await user.save();
    if(!result.ok) res.status(200).json(user);
    else res.status(500).json({message : "fail!"});
  })
  .post('/signin', async(req,res)=>{
    var result = await Users.findOne(req.body);
    if(!result) return res.status(404).json({message : "User not found"});
    else res.status(200).json(result);
  })
  .get('/auto/:token', async(req,res)=>{
    var token = req.params.token;
    var result = await Users.findOne({"token":token});
    if(!result) return res.status(404).json({message : "Not found user"})
    else return res.status(200).json({user : result})
  })
  .post('/chk', async(req,res)=>{
    var result = await Users.find();
    res.send(result);
  })
  .get('/', (req,res)=>{
    res.send('G')
  })
  .post('/img', upload.single('img'), async(req,res)=>{
    var fName = req.file.filename;
    fName = "http://"+"iwin247"+".kr:3000/image/" + fName;
    var photo = new Social({
      name : req.body.name,
      filename : fName
    })
    var result = await photo.save();
    if(!result.ok) return res.status(200).json({message : "Success"})
    else return res.status(404).json({message : "Not found"});
  })
}
