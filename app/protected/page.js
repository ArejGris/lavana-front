
import MyProtected from "@/components/protected/protected";
import { cookies } from "next/headers";



export default function Protected(){
const isAuth=cookies().get("jwt")
    return(<>
   {!isAuth&& <>not accessible</>}
   {isAuth&& <MyProtected/>}
    </>)
}