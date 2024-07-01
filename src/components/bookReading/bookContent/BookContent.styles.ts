'use client';
import { Wrapper } from '@/styles/globals.styles';
import styled from '@emotion/styled';

export const ContentWrapper = styled(Wrapper)`
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

		@media (min-width: 1280px) {
			font-weight: 700;
			line-height: 28.8px;
		}
	}
`;

