const peopleQuery = 'https://www.storest.com/collections/users/records'
const peopleResponse = await fetch(peopleQuery, {
  method: 'POST',
  data: {
    username: 'newuser',
    password: 'newpassword'
  },
  headers: {
    username: 'storest_example_account',
    password: 'secretpassword'
  }
})
const people = peopleResponse.json()
