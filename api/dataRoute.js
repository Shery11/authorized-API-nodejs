var express = require('express');
var router = express.Router();

var Data = require('./model.js');
var Token = require('./token.js');


// middle ware that will check for token
router.use(function(req,res,next){
	console.log('Middle-ware called');

     var token = req.headers['x-access-token'];

     if(token){
     	console.log(token);
         
         Token.findOne({value:token},function(err,obj){
         	if(err){
         	  res.json({success:false,message:err});	
         	}else if(obj){
              console.log("Token is valid");
              next();
         	}else{
         	  console.log("Token is invalid");
              res.json({success:false,message:"please send a valid token"});	
            }
         })

     	
     }else{
     	 res.json({success:false,message:"No token sent"});
     }
});


router.post('/json',function(req,res){
   console.log("I am hit");
  
   var data = req.body;
   var entries = [];


   data.transactions.forEach(function(element){
   	  // console.log(element);
   	  // console.log("=================Start======================");
      var entry = new Data();
       
      entry._id = data.deviceId+element.id;
      entry.deviceId = data.deviceId;
      entry.id = element.id;
      entry.type = element.type;
      entry.total = element.total;
      entry.taxInPrice = element.taxInPrice;
      entry.timestamp = element.timestamp;
      entry.items = element.items;
      entry.payments = element.payments;
      entry.audience = element.audience;

      // console.log(entry);
      // console.log("=====================End==================");
    
      entries.push(entry);
   });


   Data.insertMany(entries,{
      ordered: false
   },function(err,docs){
          if(err){

             if(err.writeErrors){


	             if(err.writeErrors.length === entries.length){
	             	res.json({success:false,message:"All the documents are duplicate"});
	             	 err.writeErrors.forEach(function(element){
	                    console.log("Duplicate ID :"+    element.getOperation()._id);
	                 })
	             }else{
	               
	                err.writeErrors.forEach(function(element){
	                    console.log("Duplicate ID :"+    element.getOperation()._id);
	                })

	                 res.json({success:true,message:  `${entries.length - err.writeErrors.length} documents written` });
	             }
	         }else{
                  
                console.log("Duplicate ID :"+    err.getOperation()._id);  
	         	res.json({success:true,message: "1 document written"});

	         } 

           }else{
            res.json({success:true,message:docs});
          }

    }).catch(function(){
    	console.log("");
    })


})



module.exports = router