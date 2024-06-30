import { Icon } from '@/components/common/Icon';
import { HeaderWrapper } from './Header.styles';

export default function BookHeader() {
	return (
		<HeaderWrapper>
			<header>
				{' '}
				<p className="library">Бібліотека</p>
				<Icon name="arrow_right" />
				<p className="title">Майстер і Маргарита</p>
			</header>
			<div className='chapter'>
				<h3>Усвідомленість. Як знайти гармонію в нашому шаленому світі</h3>
			</div>
		</HeaderWrapper>
	);
}
