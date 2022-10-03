import * as React from "react";
import {
	Box,
	Typography,
} from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import Tokenomics from "./Tokenomics";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Item(props: any) {
	return (
		<Box className="mt-20">
			<img src={`/assets/images/${props.item.img}.png`} className="instruction-image" alt="" />
		</Box>
	)
}

export default function Introduction() {
	var items = [
		{
			img: "carousel1"
		},
		{
			img: "carousel2"
		},
		{
			img: "carousel3"
		},
		{
			img: "carousel4"
		}
	]
	return (
		<Box >
			<Carousel
				// navButtonsAlwaysVisible	= {true}
				navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
					style: {
						backgroundColor: 'cornflowerblue',
						borderRadius: 0
					}
				}}
				navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
					style: {
						bottom: '0',
						top: 'unset'
					}
				}}
				NextIcon={<ArrowForwardIosIcon />}
				PrevIcon={<ArrowBackIosNewIcon />}
				autoPlay={true}
				indicators={false}

			>
				{
					items.map((item, i) => <Item key={i} item={item} />)
				}
			</Carousel>
		</Box>
	);
}
