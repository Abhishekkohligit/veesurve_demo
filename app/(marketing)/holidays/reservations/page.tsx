
import EmptyState from "@/app/components/EmptyState"
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationClient from "./ReservationClient";



const ReservationPage = async () => {
  const currentUser = await getCurrentUser()
  
  if(!currentUser){
   return (
    <EmptyState
     title="Unauthorized"
     subtitle="Please Log In"
    />
   )
  }
 
  const reservations =await getReservations({
   autherId:currentUser.id
  })

  if(reservations.length===0){
   <EmptyState
   title="No Reservation Found"
   />
  }
 
 
 return (
    <ReservationClient
    reservations={reservations}
    currentUser={currentUser}
    
    />
  )
}

export default ReservationPage