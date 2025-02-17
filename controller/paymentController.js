const { default: axios } = require("axios")
const User = require("../model/userModel")

exports.initiateKhaltiPayment = async(req,res)=>{
    const userId = req.user.id
    const { amount} = req.body
    console.log("userId and amount",userId, amount)
    if(!userId || !amount){
        return res.status(400).json({
            message : "PLease provide userId and Amount"
        })
    }
    const data = {
        return_url : "http://localhost:5000/api/payment/success",
        purchase_order_id : userId,
        amount : amount,
        website_url : "http://localhost:5000/",
        purchase_order_name : "orderName_" + userId 

    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : `key ${process.env.AUTHORIZATION}`,
        }
    })
    //console.log(response.data)
    let user = await User.findById(userId)
   // console.log(user)
    //console.log("ticket",ticket)
    user.paymentDetails.pidx = response.data.pidx
    await user.save()
    // res.redirect(response.data.payment_url)
    res.status(200).json({
        message: "Payment initiation successful",
        payment_url: response.data.payment_url
    });
    
}

exports.verifyPidx = async(req,res)=>{
    //const app = require("./../../../app")
    //const io = app.getSocketIo()

    const pidx = req.query.pidx
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
        headers : {
            'Authorization' : `key ${process.env.AUTHORIZATION}`
        }

    })
    if(response.data.status == 'Completed'){
        //database modification

        let user = await User.find({'paymentDetails.pidx' : pidx})
       // console.log(ticket)
        user[0].paymentDetails.method = 'Khalti'
        user[0].paymentDetails.status = 'paid'
        await user[0].save()



        //notify to success frontend
       // res.redirect("http://localhost:5000/successPage")
       const walletUrl = `https://test-pay.khalti.com/wallet?pidx=${pidx}`;
            return res.redirect(walletUrl);
       //alert("successful")
       // io.emit("payment",{message : "Payment Successfully"})

    }else{
        //notify error to frontend
        res.redirect("http://localhost:5000/errorPage")
        //io.emit("payment",{message : "Payment Failure"})

    }
}