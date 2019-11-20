const personQuery = 'https://example.bitabase.net/people/3'
const personResponse = await fetch(personQuery, {
  method: 'PUT',
  data: {
    id: 3,
    location: 'Ireland'
  }
})
const person = personResponse.json()

console.log(person)

{
  id: 3,
  location: 'Ireland'
}