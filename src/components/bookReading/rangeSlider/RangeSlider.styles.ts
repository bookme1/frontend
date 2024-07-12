'use client';
import styled from '@emotion/styled';

export const Slider = styled.div`
		.range-slider-bar {
			position: absolute;
			left: 0;
			height: 2px;
			background-color: var(--red);
			margin-left: 14px;
		}

		.range-slider-handle {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: calc(-1 * 40px / 2);
			width: 68px;
			height: 29px;
			background-color: #ffffff;
			border-radius: 100px;
			box-shadow: -1px -1px 4px 0px #0000001a;

			&:hover {
				box-shadow: 1px 2px 4px 0px #00000026;
			}
		}

		.range-slider-label {
			font-family: 'Raleway';
			font-weight: 700;
			font-size: 18px;
			position: absolute;
			z-index: 1;
			top: 50%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			display: flex;
			justify-content: center;
			align-items: center;
			color: #121212;
			user-select: none;
		}
	

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
		background-color: #121212;
	}
`;
