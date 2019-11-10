const { fastn } = require('../../fastn')
const createHeader = require('../components/header')

function myAccount (app) {
  return fastn('div',
    createHeader(app),

    fastn('main',
      fastn('section',
        fastn('h1', 'My Account'),
        fastn('h2', 'Usage'),
        fastn('p', 'You have used',
          fastn('strong', ' 10 reads '),
          'and',
          fastn('strong', ' 2 writes ')
        ),

        fastn('h2', 'Databases'),
        fastn('p', 'You have a total of',
          fastn('strong', ' 10 databases ')
        ),

        fastn('table', {class: 'table'},
          fastn('thead',
            fastn('tr',
              fastn('th', {class: 'grow'}, 'Name'),
              fastn('th', {class: 'text-center'}, 'Collections'),
              fastn('th', {class: 'text-center'}, 'Reads'),
              fastn('th', {class: 'text-center'}, 'Writes'),
              fastn('th', {class: 'text-center'}, 'Space'),
              fastn('th', 'Date Created'),
              fastn('th', '')
            )
          ),

          fastn('tbody:list', {
            items: [1,2,3],
            template: () =>
              fastn('tr',
                fastn('td', {class: 'grow'}, 'Name'),
                fastn('td', {class: 'text-center'}, '2'),
                fastn('td', {class: 'text-center'}, '100'),
                fastn('td', {class: 'text-center'}, '20'),
                fastn('td', {class: 'text-center'}, '10gb'),
                fastn('td', '10 January 2019'),
                fastn('td', {class: 'text-right'},
                  fastn('a', { class: 'button button-small', href: '/collections' }, 'View')
                )
              )
          })
        )
      )
    ))
}

module.exports = myAccount
