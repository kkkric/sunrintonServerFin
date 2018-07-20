function image(app, app, Social, path, multer, rndstring){
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
}