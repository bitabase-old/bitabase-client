const { fastn, binding } = require('../../fastn')
const createHeader = require('../components/header')

const date = require('date-fp')

function myAccount (app) {
  app.database.getDatabases()

  return fastn('div',
    createHeader(app),

    fastn('main',
      fastn('section',
        fastn('h1', 'My Account'),
        fastn('h2', 'Usage'),
        fastn('p', 'You have used',
          fastn('strong', ' 0 reads '),
          'and',
          fastn('strong', ' 0 writes ')
        ),

        fastn('h2', 'Databases'),
        fastn('p', 'You have a total of',
          fastn('strong', binding(
            'databases.length', databaseLength => ` ${databaseLength || 0} databases`
          ))
        ),

        fastn('a', { class: 'button', href: '/databases/create' }, 'Create a new database'),

        fastn('h2', 'Your databases'),

        fastn('table', { class: 'table' },
          fastn('thead',
            fastn('tr',
              fastn('th', { class: 'grow' }, 'Name'),
              fastn('th', { class: 'text-center' }, 'Collections'),
              fastn('th', { class: 'text-center' }, 'Reads'),
              fastn('th', { class: 'text-center' }, 'Writes'),
              fastn('th', { class: 'text-center' }, 'Space'),
              fastn('th', 'Date Created'),
              fastn('th', '')
            )
          ),

          fastn('tbody:list', {
            items: binding('databases'),
            emptyTemplate: () =>
              fastn('tr',
                fastn('td', { colspan: 100, class: 'text-center' },
                  'You have no databases, why not ',
                  fastn('a', { href: '/databases/create' }, 'create a new one'),
                  ' now'
                )
              ),
            template: () =>
              fastn('tr',
                fastn('td', { class: 'grow' }, binding('item.name')),
                fastn('td', { class: 'text-center' }, binding('item.total_collections')),
                fastn('td', { class: 'text-center' }, binding('item.total_reads')),
                fastn('td', { class: 'text-center' }, binding('item.total_writes')),
                fastn('td', { class: 'text-center' }, binding('item.total_space')),
                fastn('td', binding('item.date_created', dateCreated => {
                  return date.format('DD MMMM YYYY, HH:mm:ss', date.fromTime(dateCreated))
                })),
                fastn('td', { class: 'text-right' },
                  fastn('a', { class: 'button button-small', href: '/collections' }, 'View')
                )
              )
          })
        )
      )
    ))
}

module.exports = myAccount
