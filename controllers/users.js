'use strict'

exports.isValidUser = function(username, password) {

  if (username === 'gilles' && password === 'admin')
    return true
  else
    return false
}

exports.getUserByCredentials = function(username, password) {

  return {
    id        : 0,
    full_name : 'Gilles De Mey',
    scopes    : ['astromo:admin']
  }

}

exports.getUserById = function(id) {

  return {
    id        : 0,
    full_name : 'Gilles De Mey',
    scopes    : ['astromo:admin']
  }

}