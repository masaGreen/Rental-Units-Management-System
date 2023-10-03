
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 5,
  p: 0.2,
};

type ModalProps = {
  open: boolean,
  handleClose: () => void,
  id: number | null,
  url: string
}

export default function DeletionModal({ open, handleClose, id, url }: ModalProps) {
  const navigate = useNavigate();
  function processNavigation(rawUrl: string): string {
    const stringArr: string[] = rawUrl.split("v1");
    const link: string[] = stringArr[1].split("/");
    return link[1]
  }


  async function deleteUnit() {
    handleClose();

    await fetch(`${url}/${id}`, { method: "DELETE" });
    window.location.reload()
    navigate(`/${processNavigation(url)}`)

  }

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure ypu wnt to delete unit?
          </Typography>
          <Stack spacing={1} direction="row" sx={{ m: "1rem" }}>
            <Button autoFocus variant='contained' color="error" sx={{ textTransform: "none" }} onClick={deleteUnit}>delete</Button>
            <Button autoFocus variant='contained' sx={{ textTransform: "none" }} onClick={handleClose}>cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}