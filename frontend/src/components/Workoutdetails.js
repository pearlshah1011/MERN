import { useWorkoutscontext } from "../hooks/useworkoutscontext"
import formatDistancetoNow from "date-fns/formatDistanceToNow"

const Workoutdetails=({workout})=>{
  const {dispatch}=useWorkoutscontext()
  const handleClick=async()=>{
    const response=await fetch('/api/workouts/'+workout._id,{
      method:'DELETE'
    })
    const json=await response.json()

    if(response.ok)
    {
      dispatch({type:'DELETE_WORKOUT',payload:json})

    }
  }
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load(kg):</strong>{workout.load}</p>
        <p><strong>Reps:</strong>{workout.reps}</p>
        <p>{formatDistancetoNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>


    </div>

  )
}
export default Workoutdetails