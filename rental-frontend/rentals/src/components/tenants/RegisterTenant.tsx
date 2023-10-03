import { Stack, Box, TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {

    firstName: string,
    lastName: string,
    phone: string,
    unitNumber: string

}
export default function RegisterTenant() {
    const { register, handleSubmit, reset } = useForm<RegisterFormData>();
    const navigate = useNavigate()
    async function onSubmit(data: RegisterFormData) {
        await fetch("http://localhost:8080/v1/tenants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });
        reset();
        navigate(-1);
    }
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <h2>Register Tenant</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <TextField label="Firstname" type="text" {...register("firstName")} />
                        <TextField label="Firstname" type="text" {...register("lastName")} />
                        <TextField label="Phone" type="text" {...register("phone")} />
                        <TextField label="Unitnumber" type="text" {...register("unitNumber")} />
                        <Button type="submit" color="success" variant="contained" sx={{ textTransform: "none" }}>register</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}