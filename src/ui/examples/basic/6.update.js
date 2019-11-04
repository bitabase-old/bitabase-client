const personQuery = 'https://example.bitabase.com/people/3'
const personResponse = await fetch(personQuery, {
  method: 'PATCH',
  data: {
    location: 'London'
  }
})
const person = personResponse.json()

console.log(person)

{
  id: 3,
  name: 'Paul',
  location: 'London'
}