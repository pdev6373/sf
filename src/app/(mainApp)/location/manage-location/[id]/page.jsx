import EditLocation from "../ManageLocation"
async function page({ params }) {
  const id = params.id;
  console.log(id)
  // const res = await fetch('')
  // const location = await res.json()

  const res = await fetch('https://api-tracker.dev.dangote.islands.digital/Users/All?page_no=1&page_size=50')
  const users = await res.json()
  
  return (
    < EditLocation
      users={users}
    />
  )
}

export default page