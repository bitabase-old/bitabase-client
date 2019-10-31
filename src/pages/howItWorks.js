const fs = require('fs')
const { fastn, binding } = require('../fastn')
const createHeader = require('../components/header')

function createExampleSection () {
  return fastn('ul', { class: 'blocks' },
    fastn('li',
      fastn('h2', binding('item.title')),
      fastn('p', { innerHTML: binding('item.description') }),
      fastn('pre',
        fastn('code', { class: 'js' }, binding('item.example'))
          .on('render', function () {
            hljs.highlightBlock(this.element)
          })
      )
    )
  )
}

function howItWorksPage () {
  const examples = [{
    title: 'Admin Endpoints',
    description: 'Add custom validation and rules to any endpoint in any collection.',
    children: [{
      title: 'Create Collection',
      description: 'All options in a collection are optional except for <strong>id</strong>. If you do not provide a <strong>schema</strong> then any document fields are allowed. If you do not provide any <strong>rules</strong> then anyone can do anything.',
      example: fs.readFileSync('./src/examples/schema/1.createCollection.js', 'utf8')
    }, {
      title: 'Create Complex Collection',
      description: 'Collections can have complex rules to allow for custom business rules. In the example below we create a users table which can be used across any of your collections to login.',
      example: fs.readFileSync('./src/examples/schema/2.createComplexCollection.js', 'utf8')
    }]
  }, {
    title: 'Simple API',
    description: 'To allow any client, in any language, without any libraries to connect to your database.',
    children: [{
      title: 'Basic Search',
      description: 'You can filter any collection with a basic filter using the fieldname=value as a condition.',
      example: fs.readFileSync('./src/examples/basic/1.basicSearch.js', 'utf8')
    }, {
      title: 'Advanced Search',
      description: 'For more complex queries you can use mongo-like syntax.',
      example: fs.readFileSync('./src/examples/basic/2.advancedSearch.js', 'utf8')
    }, {
      title: 'Create',
      description: 'Creating a new resource in your collection',
      example: fs.readFileSync('./src/examples/basic/3.create.js', 'utf8')
    }, {
      title: 'Read',
      description: 'Reading an existing resource in your collection',
      example: fs.readFileSync('./src/examples/basic/4.read.js', 'utf8')
    }, {
      title: 'Replace',
      description: 'Replacing all fields on an existing resource in your collection',
      example: fs.readFileSync('./src/examples/basic/5.replace.js', 'utf8')
    }, {
      title: 'Update',
      description: 'Patching specified fields on an existing resource in your collection',
      example: fs.readFileSync('./src/examples/basic/6.update.js', 'utf8')
    }, {
      title: 'Delete',
      description: 'Deleting an existing resource in your collection',
      example: fs.readFileSync('./src/examples/basic/7.delete.js', 'utf8')
    }]
  }, {
    title: 'Advanced API',
    description: 'The API offers slightly more features',
    children: [{
      title: 'Login to user account',
      description: 'If you have a table called <strong>users</strong> you can login by setting headers',
      example: fs.readFileSync('./src/examples/advanced/1.login.js', 'utf8')
    }, {
      title: 'Manage collection records',
      description: 'As an account owner you can bypass presentors, mutations and rules by using the admin api',
      example: fs.readFileSync('./src/examples/advanced/2.manage.js', 'utf8')
    }]
  }]

  return fastn('div',
    createHeader(),

    fastn('main',
      fastn('div', { class: 'main-sale' },
        fastn('section',
          fastn('div', { class: 'container' },
            fastn('h1', { class: 'logo' }, 'bitabase'),
            fastn('h1', fastn('span', { class: 'highlight' }, 'Give your CRUD a REST'))
          ),
          fastn('h1', 'Easy as..'),
          fastn('p',
            fastn('ol',
              fastn('li', fastn('span', { class: 'highlight' }, 'POST'), ' a schema'),
              fastn('li', fastn('span', { class: 'highlight' }, 'POST'), ' a record'),
              fastn('li', fastn('span', { class: 'highlight' }, 'GET'), ' a record')
            )
          )
        )
      ),

      fastn('list', {
        items: examples,
        template: () =>
          fastn('div',
            fastn('h3', binding('item.title')),
            fastn('p', binding('item.description')),

            fastn('section:list', {
              items: binding('item.children'),
              template: createExampleSection
            })
          )
      })
    ))
}

module.exports = howItWorksPage
