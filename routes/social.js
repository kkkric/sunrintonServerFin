module.exports = social;


function social(app,Social,path, multer){
    app.post('/social', async(req,res)=>{
        var result = await Social.find();
        if(!result) return res.status(404).json({message : "Not Found"});
        else return res.status(200).json({result : result});
    })
}