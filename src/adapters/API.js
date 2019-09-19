import React from 'react'

const BASE_URL = 'https://swapi.co/api'

const PEOPLE_URL = `${BASE_URL}/people/`
const STARSHIPS_URL = `${BASE_URL}/starships/`

let results = []

const getPeople = (callback) => {
  results = []
  return getAllResults(PEOPLE_URL, callback)
}

const getStarships = (callback) => {
  results = []
  return getAllResults(STARSHIPS_URL, callback)
}

const getAllResults = (url, callback) => {
  return fetch(url)
    .then(resp => resp.json())
    .then(data => {
      if (data.next) {
        results = results.concat(data.results)
        getAllResults(data.next, callback)
      } else {
        callback(results)
      }
    }
    )
}

export default {
  getPeople,
  getStarships
}
