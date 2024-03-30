import { IconButton as MuiIconButton } from "@mui/material"
const IconButton = ({ icon, handleAction, name }) => {
  return (
    <>
      <MuiIconButton onClick={handleAction} aria-label={name}>{icon}</MuiIconButton>
    </>
  )
}

export default IconButton