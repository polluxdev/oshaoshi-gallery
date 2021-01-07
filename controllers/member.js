const Member = require('../models/Member');

const factory = require('../utils/handlerFactory');

exports.checkMember = factory.checkModel(Member);

exports.getMembers = factory.getAll(Member);

exports.getMember = factory.getOne(Member);

exports.postMember = factory.createOne(Member);

exports.patchMember = factory.updateOne(Member);

exports.deleteMember = factory.deleteOne(Member);
