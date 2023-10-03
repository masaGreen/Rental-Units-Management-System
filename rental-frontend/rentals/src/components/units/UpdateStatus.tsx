import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type Formdata = {
    number: number
}

export default function UpdateStatus() {
    const { register, handleSubmit, reset } = useForm<Formdata>();
    async function onSubmit(data: Formdata) {

        await fetch(`http://localhost:8080/v1/units/updateUnitStatus/${data.number}`);
        reset();

    }
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <h2>Update Unit Availabillty</h2>
                <h4> Enter  unitNumber for the unit to be updated and  click update </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <TextField label="search by unitNumber" type="text" {...register("number")} sx={{
                            "& .MuiInputBase-root": {
                                width: "300px",
                                background: "#cfd8dc",
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#448aff" }
                            },
                            "& .MuiFormLabel-root": {
                                color: "black",
                                fontWeight: "500"
                            },
                            "& .MuiInputLabel-root": {
                                color: "grey",
                                fontSize: "15px",
                                fontWeight: "400"

                            }
                        }} />
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"

                        >update</Button>


                    </Stack>
                </form>
            </Box>
        </>
    )
}