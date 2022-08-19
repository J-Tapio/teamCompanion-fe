import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

type Props = {
  children: JSX.Element | JSX.Element[];
};

function ToolBarMenu({children}:Props) {
  return (
    <Box ml='auto'>
      <Stack direction='row' alignItems='center' spacing={1}>
      {children}
      </Stack>
    </Box>
  );
}

export default ToolBarMenu;
