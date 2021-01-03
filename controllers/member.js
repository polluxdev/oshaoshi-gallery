const Member = require('../models/Member');

const factory = require('../utils/handlerFactory');

exports.checkMember = factory.checkModel(Member, 'memberId');

exports.getMembers = factory.getAll(Member);

exports.getMember = factory.getOne(Member, 'memberId');

exports.postMember = factory.createOne(Member);

exports.patchMember = factory.updateOne(Member, 'memberId');

exports.deleteMember = factory.deleteOne(Member, 'memberId');
