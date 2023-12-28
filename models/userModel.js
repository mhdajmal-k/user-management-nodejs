const mongoose=require("mongoose")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true

    },email:{
        type:String,
        require:true

    },password:{
        type:String,
        require:true

    },mobile:{
        type:String,
        require:true

    }
    ,createdAt: {
         type: Date, 
         default: Date.now 
    },
    is_admin:{
        type:Number,
        require:true
    },
    is_varified:{
        type:Number,
        default:0
    }
 
})

const userData=mongoose.model("userData",userSchema)

module.exports=userData




