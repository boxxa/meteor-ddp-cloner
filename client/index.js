import Fingerprint from 'fingerprintjs'
import DDP from 'ddp.js'
Template.captureTemplate.helpers({
    fingerprintData: function(){
        return Session.get("fingerprintId")
    },
    ddpStatus: function(){
       return Session.get("localDDP")
    }
})
Template.collectionData.helpers({
    captureData: function(){
        return CaptureData.find({})
    },
    allFields: function(){
        var theFields = this.captureFields
        for(field in theFields)
        {
            console.log(field,theFields[field])
        }
    },
    fingerprintData: function(){
       return Session.get("fingerprintId")
    }
})

Template.blogPage.onRendered(function(){
    Session.setDefault("fingerprintId","unknown")
    Session.setDefault("localDDP","disconnected")
    console.log("Fetching fingerprint...")
    var fingerprint = new Fingerprint({canvas: true}).get();
    Session.set("fingerprintId",fingerprint)
    console.log("FingerprintId:",fingerprint)
    console.log("Finding DDP...")
    const options = {
    endpoint: "ws://localhost:3000/websocket",
    SocketConstructor: WebSocket
    };
    const ddp = new DDP(options);
    
    ddp.on("connected", function(){
         Session.set("localDDP","connected")
        console.log("Connected to DDP over websocket: ws://localhost:3000");
    });
    
    var uploadPayload = {}
    ddp.on("added",function(data){
        console.log("Added")
        uploadPayload.fingerprint = Session.get("fingerprintId")
        uploadPayload.data = []
        if(data.msg==="added"){
            console.log("Added")
            Meteor.call("uploadData",Session.get("fingerprintId"),data.collection,data.fields)
        } else {
            console.log(data)
        }
    })
    
})

Template.captureTemplate.onRendered(function(){
    Session.setDefault("fingerprintId","unknown")
    console.log("Fetching fingerprint...")
    var fingerprint = new Fingerprint({canvas: true}).get();
    Session.set("fingerprintId",fingerprint)
})
Template.registerHelper("keyval",function(object){
  return _.map(object, function(value, key) {
    return {
      key: key,
      value: value
    };
  });
});