import { Stack, Box, TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form";

type RegisterFormData = {

    waterBill: string,
    garbage: string,
    amountPaid: string,
    unitNumber: string

}
export default function RegisterUtlitity() {
    const { register, handleSubmit, reset } = useForm<RegisterFormData>();
    async function onSubmit(data: RegisterFormData) {
        await fetch("http://localhost:8080/v1/utilities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });
        reset();
    }
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <h2>Register UtilityPayment</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>

                        <TextField label="Waterbill" type="text" {...register("waterBill")} />
                        <TextField label="Garbage" type="text" {...register("garbage")} />
                        <TextField label="Amountpaid" type="text" {...register("amountPaid")} />
                        <TextField label="Unitnumber" type="text" {...register("unitNumber")} />
                        <Button type="submit" color="success" variant="contained" sx={{ textTransform: "none" }}>register</Button>
                    </Stack>
                </form>
            </Box>
        </>
    )
}