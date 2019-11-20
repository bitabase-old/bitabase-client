const collection = {
  id: 'users',

  // Creating and updating items must conform to this schema
  schema: {
    username: ['required', 'string'],
    password: ['required', 'string'],
    permissions: ['required', 'array']
  },

  // These will be run on each record before presenting back to the client
  presenters: [
    'delete data.password'
  ],

  // These will be run on each record before saving to the database
  mutations: [
    'data.password = bcrypt(data.password)'
  ],

  // You can also set rules for each method
  rules: {
    POST: [
      // Allow anyone to register, but only admins to add permissions
      'data.permissions.length === 0 || user.permissions.includes("admin")'
    ],
    PUT: [
      'user.permissions.includes("admin")'
    ],
    PATCH: [
      'user.permissions.includes("admin")'
    ],
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