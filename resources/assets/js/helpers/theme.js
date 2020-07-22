import {createMuiTheme} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import lightGreen from '@material-ui/core/colors/lightGreen'
const theme = createMuiTheme({
	palette:{
		secondary:{
			main:purple[500],
		},
		warning:lightGreen
	}
})

export default theme;