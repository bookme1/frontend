'use client';
import { Wrapper } from '@/styles/globals.styles';
import styled from '@emotion/styled';

export const HeaderWrapper = styled(Wrapper)`
	margin-bottom: 24px;

	@media (min-width: 768px) {
		margin-bottom: 32px;
	}

	@media (min-width: 1280px) {
		margin-bottom: 48px;
	}

	.reading-header {
		display: flex;
		gap: 12px;
		margin-bottom: 32px;
	}

	p {
		font-size: 18px;
		font-weight: 500;
		line-height: 21.13px;
	}

	.title {
		margin-left: 4px;
		color: var(--red);

		@media (min-width: 768px) {
			margin-left: 12px;
		}
	}

	.chapter {
		@media (min-width: 768px) {
			width: 539px;
			margin-left: auto;
			margin-right: auto;
		}
	}
	h3 {
		text-align: center;
		font-size: 24px;
		font-weight: 700;
		line-height: 33.6px;
	}
`;
