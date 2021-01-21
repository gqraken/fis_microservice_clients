const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 32 },
    password: { type: String, required: true, minlength: 6, maxlengt: 512 },
    firstName: { type: String, required: true, trim: true, maxlength: 128 },
    lastName: { type: String, required: true, trim: true, maxlength: 128 },
    address: { type: String, required: true, trim: true, maxlength: 255 },
    email: { type: String, required: true, unique: true, trim: true, minlength: 6, maxlength: 255 },
    phone: { type: String, required: true, unique: true, trim: true },
}, { 
    timestamps: true,
}
);

clientSchema.methods.cleanup = function(){
    return {username: this.username, password: this.password, firstName: this.firstName, lastName: this.lastName, address: this.address,email: this.email, phone: this.phone};
}

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;