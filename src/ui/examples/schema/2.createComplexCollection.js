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
    '{...record password: undefined}'
  ],

  // These will be run on each record before saving to the database
  mutations: [
    '{...body password: hashText(body.password)}'
  ],

  // You can also set rules for each method
  rules: {
    AUTH: [
      'verifyHash(body.password record.password) ? "" : "Login Failed"'
    ],

    POST: [
      // Allow anyone to register, but only admins to add permissions
      'length(data.permissions) === 0 || includes("admin", user.permissions)'
    ],
    PUT: [
      'includes("admin", user.permissions)'
    ],
    PATCH: [
      'includes("admin", user.permissions)'
    ],
    DELETE: [
      '"can not delete people"'
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