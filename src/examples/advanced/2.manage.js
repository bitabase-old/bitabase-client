const peopleQuery = 'https://www.bitabase.com/collections/users/records'
const peopleResponse = await fetch(peopleQuery, {
  method: 'POST',
  data: {
    username: 'newuser',
    password: 'newpassword'
  },
  headers: {
    username: 'bitabase_example_account',
    password: 'secretpassword'
  }
})
const people = peopleResponse.json()
