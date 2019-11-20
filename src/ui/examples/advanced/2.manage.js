const peopleQuery = 'https://api.bitabase.net/v1/databases/test/collections/people/records'
const peopleResponse = await fetch(peopleQuery, {
  method: 'POST',
  data: {
    username: 'newuser',
    password: 'newpassword'
  },
  headers: {
    sessionId: 'find in the my account page',
    sessionSecret: 'find in the my account page'
  }
})
const people = peopleResponse.json()
