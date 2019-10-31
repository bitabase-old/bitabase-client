const peopleQuery = 'https://example.bitabase.com/people?location=france'
const peopleResponse = await fetch(peopleQuery, {
  headers: {
    username: 'test',
    password: 'test'
  }
})
const people = peopleResponse.json()
