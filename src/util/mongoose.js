module.exports= {
    mutilmongoose: function(mongoos){
        return mongoos.map(mongoos => mongoos.toObject())
    },
    onetoObject: function(mongoos){
        return mongoos ? mongoos.toObject() : mongoos
    }
}