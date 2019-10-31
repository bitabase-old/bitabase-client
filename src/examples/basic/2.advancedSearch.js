const peopleQuery = 
  'https://example.bitabase.com/people?query={"location":{"$eq":"france"}}'
const peopleResponse = await fetch(peopleQuery)
const people = peopleResponse.json()

console.log(people)

{
  count: 2,

  data: [{
    id: 1,
    name: 'John',
    location: 'London'
  }, {
    id: 2,
    name: 'Peter',
    location: 'Australia'
  }]
}