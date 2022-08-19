import { Dispatch, SetStateAction } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//==============================================================================

interface IModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  textToUse: string;
}

// Image asset
const underConstructionImg =
  'https://ik.imagekit.io/htg3gsxgz/TEAM-COMPANION/work_in_progress.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658394229187';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '& .MuiModal-root:hover': {
    cursor: 'pointer',
  },
};

function InformalModal({open, setOpen, textToUse}:IModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box
            component="img"
            src={underConstructionImg}
            sx={{ height: '350px', objectFit: 'cover', position: 'relative', left: '1.5rem'}}
          />
          <Typography
            id="transition-modal-title"
            variant="h4"
            component="h2"
            fontWeight={700}
            textAlign={'center'}
          >
            Work in progress
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2 }}
          >
            {textToUse}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default InformalModal;
