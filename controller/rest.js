const Restaurant=require('../model/restaurant');

exports.getAllRestaurants= (req,res)=>{
    
    Restaurant.find().then(result=>{
        res.status(200).json({
            message:"Restaurants fetched",
            restaurants:result,
        });
    }).catch(error=>{
        res.status(500).json({
            message:"Error in database",
            error:error
        });
    });
}

exports.api=async(req,res)=>{
    try{
        const page=parseInt(req.query.page)-1 ||0;
        const limit=parseInt(req.query.limit) ||0;
        const search= req.query.search ||"";
        let sort = req.query.sort || "aggregate_rating"&"min_price";
        let restaurants= req.query.restaurants || "All";

        const restoptions=[
            "meal type",
            "locality",
            "cuisine.name",
            "city",
            "low cost",
            "high cost",
            "sort",
            "page no",
            "name"
        ];
        restaurants==="All"
        ?(restaurants=[...restoptions]):(restaurants=req.query.restaurants.split(','))
        req.query.sort
        ?(sort=req.query.sort.split(',')):(sort=[sort]);

        let sortby={};
        if(sort[1]){
            sortby[sort[0]]=sort[1]
        }else{
            sortby[sort[0]]="asc";
        }

        const frest = await Restaurant.find(
            {
            $or: [
                {
                    name:{
                        $regex:search,
                        $options:"i"
                    }
                },
                {
                    locality:{
                        $regex:search,
                        $options:"i"
                    }
                },
                {
                    "cuisine.name":{
                        $regex:search,
                        $options:"i"
                    }
                },
                {
                    city:{
                        $regex:search,
                        $options:"i"
                    }
                }
            ]
        })
        .where("Restaurant")
        .in([...restoptions])
        .sort(sortby)
        .skip(page*limit)
        .limit(limit);

        const total= await Restaurant.countDocuments({
            restaurants:{$in:[restoptions]},
            name:{$regex:search,$options:"i"},
            "cuisine.name":{$regex:search,$options:"i"},
            city:{$regex:search,$options:"i"}
        });

        const response={
            error:false,
            total,
            page:page+1,
            limit,
            restaurants:restoptions,
            frest,
        };
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:true,
            message:"Internal server error!"
        });
    }
};
exports.fetchingLocation=(req,res)=>{
  
    let location_id = req.params.id;
    Restaurant.find().then(result=>{
       let locationBasedRes =  result.filter( obj => {
        return obj.location_id == location_id} );
  
       res.status(200).json({
           message:"Restaurant Fetched",
           Restaurants:locationBasedRes
       });
   }).catch(error=>{
       res.status(500).json({
           message:"Error in Database",
           error:error
       });
   });
  };

//   exports.clickingRest=(req,res)=>{
  
//     //let _id = req.params.id;
//     Restaurant.find({_id:req.params['resid']}).then(result=>{
//        res.status(200).json({
//            message:"Restaurant Fetched",
//            Restaurants: result
//        });
//    }).catch(error=>{
//        res.status(500).json({
//            message:"Error in Database",
//            error:error
//        });
//    });
//   };
exports.clickingRest=(req,res)=>{
  
    let id = req.params['details'];
    Restaurant.find().then(result=>{
       let restaraunt =  result.filter( obj => {
        return obj._id == id} );
  
       res.status(200).json({
           message:"Restaurant Fetched",
           Restaurants:restaraunt
       });
   }).catch(error=>{
       res.status(500).json({
           message:"Error in Database",
           error:error
       });
   });
  };