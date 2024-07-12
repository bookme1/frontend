'use client';
import { Wrapper } from '@/styles/globals.styles';
import styled from '@emotion/styled';

export const ContentWrapper = styled(Wrapper)`
	background-color: var(--primary-background-color);
	padding-bottom: 40px;
	/* padding: 0 16px; */

	@media (min-width: 768px) {
		padding-bottom: 48px;
	}

	@media (min-width: 1280px) {
		font-weight: 700;
		line-height: 28.8px;
	}

	.illustration {
		margin: 32px 0;

		@media (min-width: 768px) {
			margin: 48px 0;
		}
	}

	.text {
		font-size: 18px;
		font-weight: 500;
		line-height: 18.8px;

		color: var(--text-color);

		@media (min-width: 1280px) {
			font-weight: 700;
			line-height: 28.8px;
		}
	}
`;
