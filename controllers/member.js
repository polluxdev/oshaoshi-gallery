const Member = require('../database/models/Member');

const factory = require('../utils/handlerFactory');
const upload = require('../utils/multer');

exports.uploadImage = upload.single('image');

exports.processImage = factory.processImage(Member);

exports.checkImage = factory.checkImage(Member);

exports.checkMember = factory.checkModel(Member);

exports.getMembers = factory.getAll(Member);

exports.getMember = factory.getOne(Member);

exports.postMember = factory.createOne(Member);

exports.patchMember = factory.updateOne(Member);

exports.deleteMember = factory.deleteOne(Member);

exports.collectImage = factory.collectImage(Member);

exports.deleteAllMembers = factory.deleteAll(Member);