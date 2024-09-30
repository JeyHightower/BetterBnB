'use strict';

/** @type {import('sequelize-cli').Migration} */

import { User } from '../models';
import { hashSync } from "bcryptjs";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

export async function up(queryInterface, Sequelize) {
  await User.bulkCreate([
    {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: hashSync('password')
    },
    {
      firstName: 'Firstnameuser1',
      lastName: 'Lastnameuser1',
      email: 'user1@user.io',
      username: 'FakeUser1',
      hashedPassword: hashSync('password2')
    },
    {
      firstName: 'Firstnameusertwo',
      lastName: 'Lastnameusertwo',
      email: 'user2@user.io',
      username: 'FakeUser2',
      hashedPassword: hashSync('password3')
    }
  ], { validate: true });
}
export async function down(queryInterface, Sequelize) {
  options.tableName = 'Users';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
  }, {});
}
