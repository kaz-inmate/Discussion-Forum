const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type:String,
        index: true
    },
    descrip: {
        type: String
    },
    creation_date: String
});

noticeSchema.index({"title" : "text"});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;