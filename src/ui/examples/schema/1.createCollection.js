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

const newCollectionQuery = 'https://api.bitabase.net/v1/databases/test/collections'
const collectionResponse = await fetch(newCollectionQuery, {
  method: 'POST',
  headers: {
    sessionId: 'find in the my account page',
    sessionSecret: 'find in the my account page'
  },
  data: JSON.stringify(collection)
})