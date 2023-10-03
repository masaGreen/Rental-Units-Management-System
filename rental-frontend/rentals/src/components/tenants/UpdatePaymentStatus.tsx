import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Formdata = {
    phone: number,
    payStatus: string

}
const styles = {
    "& .MuiInputBase-root": {
        width: "300px",
        background: "#cfd8dc",
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#448aff" },
    },
    "& .MuiFormLabel-root": {
        color: "black",
        fontWeight: "500",
    },
    "& .MuiInputLabel-root": {
        color: "grey",
        fontSize: "15px",
        fontWeight: "400",
    }
}

export default function UpdateStatus() {
    const { register, handleSubmit, reset } = useForm<Formdata>();
    const [val, setVal] = useState("")
    async function onSubmit(data: Formdata) {

        await fetch(`http://localhost:8080/v1/tenants/updatePaymentStatus`, {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(data)
        });

        reset();
        setVal("")

    }
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <h2>Update Tenant payment Status</h2>
                <h4> Enter  tenant's phoneNumber click update </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <TextField label="Enter phone number" type="text" {...register("phone")} sx={styles} />

                        <TextField
                            select
                            label="payStatus"
                            value={val}
                            {...register("payStatus")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value)}
                        >
                            <MenuItem value={"unpaid"}>unpaid</MenuItem>
                            <MenuItem value={"paid"}>paid</MenuItem>

                        </TextField>

                        <Button
                            type="submit"
                            color="success"
                            variant="contained"

                        >
                            update
                        </Button>

                    </Stack>
                </form>
            </Box>
        </>
    )
}