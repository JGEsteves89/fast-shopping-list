import { alpha, Paper, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import './bottomSheet.css';
function BottomSheet(props) {
	const [show, setShow] = [props.show, props.setShow];
	const theme = useTheme();

	return (
		show && (
			<ClickAwayListener onClickAway={() => setShow(false)}>
				<Slide in={show} direction="up">
					<Paper className="bottom-sheet" sx={gradientBackground(theme)} elevation={3}>
						<div className="sheet-header">
							<Fab
								onClick={() => setShow(false)}
								className="close-button-fab"
								size="small"
								sx={{ background: 'transparent', color: 'white' }}>
								<CloseIcon fontSize="small" />
							</Fab>
						</div>
						{props.children}
					</Paper>
				</Slide>
			</ClickAwayListener>
		)
	);
}
const gradientBackground = (theme) => {
	return {
		background: `linear-gradient(0deg, rgba(0,0,0,1) -150%, ${alpha(theme.palette.background.default, 1)} 100%)`,
	};
};
export default BottomSheet;
