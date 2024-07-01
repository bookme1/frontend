import { BookContent } from '@/components/bookReading/bookContent/BookContent';
import BookHeader from '@/components/bookReading/bookReadingHeader/Header';
import PageTurner from '@/components/bookReading/pageTurner/PageTurner';
// import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

export default function Home() {
	return (
		<>
			<Header />
			<BookHeader />
			<PageTurner />
			<BookContent />
			{/* <Footer /> */}
		</>
	);
}
