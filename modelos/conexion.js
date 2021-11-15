var mongoose= require("mongoose")

//const monngodb_url="mongodb+srv://chelo:1234@cluster0.cpkis.mongodb.net/inmobiliaria?retryWrites=true&w=majority";
const monngodb_url="mongodb+srv://moises:MariaPaula2021@grupo19.8rfev.mongodb.net/inmobiliaria?retryWrites=true&w=majority";

mongoose.connect(monngodb_url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb esta conectado");
}).catch((error)=>{
    console.log("mondb no esta conectado");
    console.log(error);
});
