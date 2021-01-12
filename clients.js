const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nif: String,
    name: String,
    address: String,
    mail: String,
    phone: Number
});

clientSchema.methods.cleanup = function(){
    return {nif: this.nif, name: this.name,address: this.address,mail: this.mail, phone: this.phone};
}

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

