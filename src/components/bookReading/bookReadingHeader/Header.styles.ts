'use client';
import { Wrapper } from '@/styles/globals.styles';
import styled from '@emotion/styled';

export const HeaderWrapper = styled(Wrapper)`
	background-color: var(--primary-background-color);
	padding-bottom: 24px;

	@media (min-width: 768px) {
		padding-bottom: 32px;
	}

	@media (min-width: 1280px) {
		padding-bottom: 48px;
	}

	.reading-header {
		display: flex;
		gap: 12px;
		padding-bottom: 32px;
		color: var(--btn-text-color);
	}

	p {
		/* color: var(--btn-text-color); */
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
		color: var(--title-color);
		text-align: center;
		font-size: 24px;
		font-weight: 700;
		line-height: 33.6px;
	}
`;
