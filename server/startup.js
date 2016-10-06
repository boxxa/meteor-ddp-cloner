Meteor.startup(function(){
    console.log("starting up")
})

Meteor.methods({
    'uploadData': function(fingerprintId,collectionName, collectionFields){
        console.log(fingerprintId,collectionName,collectionFields)
        if(CaptureData.find({fingerprint: fingerprintId, collectionName: collectionName}).count() == 0){
            // No data for collection
            console.log("Collection new.")
            CaptureData.insert({fingerprint: fingerprintId, collectionName: collectionName,collectionFields: [collectionFields], timestamp: new Date().toISOString()})
        } else {
            // Collection exists. 
            console.log("Collection exists.")
             CaptureData.update({fingerprint: fingerprintId, collectionName: collectionName}, {$push: {collectionFields: collectionFields } })
        }
        
    }
})