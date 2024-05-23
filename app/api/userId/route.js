import { cookies } from "next/headers"
import { NextResponse } from "next/server"
export  function GET(req){
  if(cookies().has("userId")){
const userId=cookies().get("userId")
return NextResponse.json(
  {
    userId :userId.value 
  })
}
return NextResponse.json({
  status:404,message:"not found userId"
})

}