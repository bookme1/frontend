'use client';

import { BookContent } from '@/components/bookReading/bookContent/BookContent';
import BookHeader from '@/components/bookReading/bookReadingHeader/Header';
import PageTurner from '@/components/bookReading/pageTurner/PageTurner';
// import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		document.body.classList.add('for_light_theme');
		// document.body.classList.add('for_dark_theme');
		// document.body.classList.add('for_beige_theme');
	});

	return (
		<>
			<Header />
			<BookHeader />
			<PageTurner filter />
			<BookContent />
			<PageTurner />
			{/* <Footer /> */}
		</>
	);
}
