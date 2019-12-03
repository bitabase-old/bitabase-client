const { fastn, binding } = require('../../fastn');
const createHeader = require('../components/header');
const createNotLoggedInSection = require('../components/notLoggedInSection');
const date = require('date-fp');

function myAccount (app) {
  app.database.getDatabases();

  return fastn('div',
    createHeader(app),

    fastn('main', { display: binding('user', user => !user) },
      createNotLoggedInSection()
    ),

    fastn('modal', { display: binding('activeLogs') },
      fastn('div', { class: 'modal-head' },
        fastn('button', 'close')
          .on('click', async function (event, collection) {
            app.database.clearLogs();
          })
      ),
      fastn('div', { class: 'modal-body' },
        fastn('pre',
          fastn('code',
            binding('activeLogs', logs => JSON.stringify(logs, null, 2))
          )
        )
      )
    ),

    fastn('main', { display: binding('user') },
      fastn('section',
        fastn('h1', 'My Account'),
        fastn('h2', 'Your session'),
        fastn('div', { class: 'session-info' },
          fastn('div', { class: 'session-info' },
            fastn('div', 'Your sessionId is: '),
            fastn('input', { readonly: true, value: binding('session.sessionId') })
          ),
          fastn('div',
            fastn('div', 'Your sessionSecret is: '),
            fastn('input', { readonly: true, value: binding('session.sessionSecret') })
          )
        ),
        fastn('h2', 'Usage'),
        fastn('p', 'You have used',
          fastn('strong', binding(
            'stats.totalReads', 'stats.totalWrites', (totalReads, totalWrites) => ` ${totalReads || 0} reads and ${totalWrites || 0} writes `
          ))
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
              fastn('th', 'Date Created')
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
                fastn('td', { class: 'grow' },
                  fastn('strong', binding('item.name')),
                  fastn('p', binding('item.name', name => `https://${name}.bitabase.net`)),
                  fastn('p:list', {
                    items: binding('item.collections'),
                    template: () =>
                      fastn('li',
                        fastn('a', { href: '#' }, binding('item.name'))
                          .on('click', async function (event, collection) {
                            app.database.switchLogs(collection.get('item'));
                          })
                      )
                  })
                ),
                fastn('td', { class: 'text-center' }, binding('item.total_collections')),
                fastn('td', { class: 'text-center' }, binding('item.total_reads')),
                fastn('td', { class: 'text-center' }, binding('item.total_writes')),
                fastn('td', { class: 'text-center' }, binding('item.total_space')),
                fastn('td', binding('item.date_created', dateCreated => {
                  return date.format('DD MMMM YYYY, HH:mm:ss', date.fromTime(dateCreated));
                }))
              )
          })
        )
      )
    ));
}

module.exports = myAccount;
