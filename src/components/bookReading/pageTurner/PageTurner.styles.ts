'use client';
import { Wrapper } from '@/styles/globals.styles';
import styled from '@emotion/styled';

export const Container = styled(Wrapper)`
	background-color: var(--primary-background-color);
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: center;
	/* margin-bottom: 48px; */

	@media (min-width: 768px) {
		gap: 16px;
	}

	.page-number {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		background-color: var(--red);
		color: #ffffff;
		padding: 13px 41px;
		font-size: 16px;
		font-weight: 700;
		line-height: 22.4px;
		border-radius: 8px;
		&:hover {
			background-color: #e62e2e;
		}
	}

	.filter {
		padding: 12px;
		background-color: var(--filter-btn-bgcolor);
		border-radius: 5px;
	}

	.full {
		display: none;

		@media (min-width: 768px) {
			display: block;
		}
	}

	.short {
		@media (min-width: 768px) {
			display: none;
		}
	}
	.turn {
		font-size: 16px;
		font-weight: 600;
		line-height: 22.4px;
		display: none;
		

		@media (min-width: 768px) {
			display: block;
		}
	}

	.arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: var(--btn-text-color);
		background-color: var( --arrow-btn-bgcolor);
		box-shadow: 1px 1px 4px 0px #00000040;

		@media (min-width: 768px) {
			width: 108px;
			border-radius: 100px;
		}

		:hover {
			background-color: var( --arrow-btn-bgcolor-hover);
		}
	}
`;
