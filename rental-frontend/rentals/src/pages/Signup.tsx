import { useForm } from "react-hook-form"


type Formdata= {
    email: string,
    password: string,
    role:string,
}
export default function Signup(){
    const {register, handleSubmit, reset} = useForm<Formdata>();
    async function onSubmit(data:Formdata) {
       const res = await fetch("http://localhost:8080/v1/auth/signup", {
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body: JSON.stringify(data)
        });
        const response =await res.json()
        console.log(response);
        reset();
    }

  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>email</label>
                <input type="text" {...register("email")}/>
                
            </div>
            <div>
                <label>password</label>
                <input type="password" {...register("password")}/>

            </div>
            <div>
                <label>role</label>
                <input type="text" {...register("role")}/>

            </div>
            <button type="submit">login</button>
            </form>
            
        </div>
    )
}