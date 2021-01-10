const mongoose = require('../connection');
const Member = require('../models/member');

const seedDatabase = async function () {
  const gracia = {
    name: 'Shani Gracia',
    birtDate: new Date('1999-08-31'),
    generation: 3,
    nickname: 'Gracia',
    status: 'active'
  };

  const anin = {
    name: 'Aninditha Rahma Cahyadi',
    birtDate: new Date('1999-01-05'),
    generation: 3,
    nickname: 'Anin',
    status: 'active'
  };

  const amel = {
    name: 'Riska Amelia Putri',
    birtDate: new Date('2000-03-18'),
    generation: 6,
    nickname: 'Amel',
    status: 'active'
  };

  const eve = {
    name: 'Eve Antoinette Ichwan',
    birtDate: new Date('2003-10-17'),
    generation: 5,
    nickname: 'Eve',
    status: 'active'
  };

  await Member.create(gracia);
  await Member.create(anin);
  await Member.create(amel);
  await Member.create(eve);
};

mongoose.connection.collections.members.drop(async function () {
  await seedDatabase();
  mongoose.connection.close();
});
