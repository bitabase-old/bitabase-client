const newPersonQuery = 'https://example.bitabase.com/people'
const personResponse = await fetch(newPersonQuery, {
  method: 'POST',
  data: JSON.stringify({
    name: 'Paul',
    location: 'London'
  })
})
const person = personResponse.json()

console.log(person)

{
  id: 3,
  name: 'Paul',
  location: 'London'
})