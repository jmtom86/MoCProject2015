var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_OGQ1MjRmNjktZTZhOS00YmUxLTk4NzktMDQ2M2UzMjY4MmQ5',
        privateKey: 'XQ2cNwJ9mXTLHbeIZxRu4Eax38XFLCnm/ZSa/XZcC3N5YFFQL0ODSXAOkNtXTToq'
    });

module.exports = (function () {
  return {
    makeCustomer: function (req, res) {
      console.log(req.body);
      client.customer.create({
          token : req.body.token,
          email : "customerToken@mastercard.com",
          name : "Customer CustomerToken",
          reference : "Ref1"
      }, function(errData, data){
       
          if(errData){
              console.error("Error Message: " + errData.data.error.message);
              // handle the error
              return;
          }
       
          console.log("Success Response: ", data);//JSON.stringify(data));
      });
    }
  }
})() 