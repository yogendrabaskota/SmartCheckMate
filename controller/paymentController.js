const { default: axios } = require("axios")
const School = require("../model/schoolModel")

exports.initiateKhaltiPayment = async(req,res)=>{
    const {schoolId} = req.body
    const { amount} = req.body
    //console.log("userId and amount",schoolId, amount)
    if(!schoolId || !amount){
        return res.status(400).json({
            message : "PLease provide userId and Amount"
        })
    }
    const data = {
        return_url : "http://localhost:5000/api/payment/success",
        purchase_order_id : schoolId,
        amount : amount,
        website_url : "http://localhost:5000/",
        purchase_order_name : "orderName_" + schoolId 

    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
        headers : {
            'Authorization' : `key ${process.env.AUTHORIZATION}`,
        }
    })
    //console.log(response.data)
    let user = await School.find({schoolId})
   // console.log("user",user[user.length-1])
    
    user[user.length-1].paymentDetails.pidx = response.data.pidx
    await user[user.length-1].save()
   // console.log("updated user",user[user.length-1])
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

        let user = await School.find({'paymentDetails.pidx' : pidx})
       // console.log(ticket)
        user[user.length-1].paymentDetails.method = 'Khalti'
        user[user.length-1].paymentDetails.status = 'paid'
        await user[user.length-1].save()



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