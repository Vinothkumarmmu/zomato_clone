const MealTypes=require('../model/mealtype');

exports.getAllMealTypes= (req,res)=>{
    
    MealTypes.find().then(result=>{
        res.status(200).json({
            message:"MealTypes fetched",
            mealtypes:result
        });
    }).catch(error=>{
        res.status(500).json({
            message:"Error in database",
            error:error
        });
    });
}