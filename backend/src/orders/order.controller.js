const Order = require("./order.model")
const stripe = require("stripe")
const createAOrder=async(req,res)=>{
    try {
const data = await req.body // Works only if express.json() is not used
        const sig = req.headers["stripe-signature"];
        const secret = "whsec_WPiGWQ1FYyDOxrg3rhqzvg9x7WNYNsq3"; // Store this in environment variables!

        const event = stripe.webhooks.constructEvent(data, sig, secret);
        console.log(event);
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
