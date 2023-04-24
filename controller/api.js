const Restaurant=require('../model/restaurant');
const router = require('../router');

router.get("/restaurant",async(req,res)=>{
    try{
        const page=paraseInt(req.query.page)-1 ||0;
        const limit=paraseInt(req.query.limit) ||0;
        const search= req.query.search ||"";
        let sort = req.query.sort || "aggregate_rating"&"min_price";
        let Restaurant= req.query.Restaurant || "All";

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
        Restaurant==="All"
        ?(Restaurant=[...restoptions]):(Restaurant=req.query.Restaurant.split(','))
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
                        $options:"a"
                    }
                },
                {
                    locality:{
                        $regex:search,
                        $options:"a"
                    }
                },
                {
                    "cuision.name":{
                        $regex:search,
                        $options:"a"
                    }
                },
                {
                    city:{
                        $regex:search,
                        $options:"a"
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
            Restaurant:{$in:[restoptions]},
            name:{$regex:search,$options:"a"},
            "cuision.name":{$regex:search,$options:"a"},
            city:{$regex:search,$options:"a"}
        });

        const response={
            error:false,
            total,
            page:page+1,
            limit,
            Restaurant:restoptions,
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
});