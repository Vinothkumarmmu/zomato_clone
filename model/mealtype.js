const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const MealsSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    meal_type:{
        type: Number,
        required: true,
    },

});
module.exports= mongoose.model("MealTypes",MealsSchema,"MealTypes");