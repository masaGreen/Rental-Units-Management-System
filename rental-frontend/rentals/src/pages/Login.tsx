import { useForm } from "react-hook-form"


type Formdata= {
    email: string,
    password: string
}
export default function Login(){
    const {register, handleSubmit, reset} = useForm<Formdata>();
    async function onSubmit(data:Formdata) {
       const res = await fetch("http://localhost:8080/v1/auth/login", {
            method:"POST",
            headers:{"Content-Type":"Application/json"},
            body: JSON.stringify(data)
        });
        const response =await res.text()
        //onSuccess
        localStorage.setItem("key", window.btoa(data.email+":"+data.password) )
        // setAuth(true)
        console.log(response);
        reset();
    }

    async function handleHello(){
        
       
        const res = await fetch("http://localhost:8080/v1/auth/changepassword", {
            method:"POST",
            headers:{
                    "Authorization":`Basic ${localStorage.getItem("key")}`,
                    "Content-Type" : "Application/json"   
                 },
            body:JSON.stringify({oldPassword:"kidogo", newPassword:"newjames"})
           
        })
        const response = await res.json()
      
        console.log(response);
    
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
            <button type="submit">login</button>
            </form>
            <button type="button" onClick={handleHello}>log hello</button>
        </div>
    )
}