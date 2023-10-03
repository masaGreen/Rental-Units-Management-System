import { Stack, Box, TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {

    plotName: string,
    unitNumber: string,
    tag: string,
    rent: number

}
export default function RegisterUnit() {
    const { register, handleSubmit, reset } = useForm<RegisterFormData>();
    const navigate = useNavigate()
    async function onSubmit(data: RegisterFormData) {
        await fetch("http://localhost:8080/v1/units", {
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
                <h2>Register Unit</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <TextField label="plotName" type="text" {...register("plotName")} />
                        <TextField label="unitNumber" type="text" {...register("unitNumber")} />
                        <TextField label="tag" type="text" {...register("tag")} />
                        <TextField label="rent" type="number" {...register("rent", { valueAsNumber: true })} />
                        <Button type="submit" color="success" variant="contained" sx={{ textTransform: "none" }}>register</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}