const collection = {
  id: 'people',

  // Creating and updating items must conform to this schema
  schema: {
    firstName: ['required', 'string'],
    lastName: ['required', 'string'],
    email: ['required', 'array']
  },

  // These will be run on each record before presenting back to the client
  presenters: [
    'data.fullname = concat(firstName, " ", lastName)'
  ],

  // You can also set rules for each method
  rules: {
    DELETE: [
      'error("can not delete people")'
    ]
  }
}

const newCollectionQuery = 'https://www.bitabase.com/collections'
const collectionResponse = await fetch(newCollectionQuery, {
  method: 'POST',
  headers: {
    username: 'bitabase_example_account',
    password: 'secretpassword'
  },
  data: JSON.stringify(collection)
})