const peopleQuery = 'https://example.storest.com/people?location=france&order=-id'
const peopleResponse = await fetch(peopleQuery)
const people = peopleResponse.json()

console.log(people)

{
  count: 2,

  data: [{
    id: 2,
    name: 'John',
    location: 'London'
  }, {
    id: 1,
    name: 'Peter',
    location: 'Australia'
  }]
}