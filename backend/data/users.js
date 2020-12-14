//SEEDER DATA

const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  }, 
  {
    name: 'Omen',
    email: 'omen@example.com',
    password: bcrypt.hashSync('omen', 10),
  },
  {
    name: 'Raze',
    email: 'raze@example.com',
    password: bcrypt.hashSync('raze', 10),
  },
]

module.exports = users