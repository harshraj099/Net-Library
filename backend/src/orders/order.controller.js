const Order = require("./order.model")

const createAOrder=async(req,res)=>{
    try {
const data = await req.text();
        const sig  = req.header.get("stripe-signature")
        const secret = "whsec_WPiGWQ1FYyDOxrg3rhqzvg9x7WNYNsq3"
        const event = stripe.webhook.constructEvent(data,sig,secret)
        console.log(event)
        //const newOrder=await Order(req.body);
        //const saveOrder= await newOrder.save();
        res.status(200).json({msg:"done"});
    } catch (error) {
        console.error("Error creating order",error);
        res.status(500).json({message:"Failed to create order"});
    }
};

const getOrderByEmail=async(req,res)=>{
    try {
        const {email}=req.params;
        const Orders=await Order.find({email}).sort({createdAt:-1});
        if(!Orders){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json(Orders);
    } catch (error) {
        console.error("Error creating orders",error);
        res.status(500).json({message:"Failed to fetch orders"});
    }
};

module.exports={
    createAOrder,
    getOrderByEmail
}
