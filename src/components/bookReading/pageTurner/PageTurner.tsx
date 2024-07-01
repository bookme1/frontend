import { Icon } from '@/components/common/Icon';
import { Container } from './PageTurner.styles';

export default function PageTurner() {
	return (
		<Container>
			<button className="arrow">
				<Icon name="arrow_left" width={24} height={24} />
				<span className="turn">Назад</span>
			</button>
			<button className="page-number">
				<span className="short">стр.</span> <span className="full">Сторінка</span>359
				<Icon name="arrow_up" width={24} height={24} />
			</button>
			<button className="filter">
				<Icon name="settings" width={24} height={24} />
			</button>
			<button className="arrow">
				<span className="turn">Вперед</span>
				<Icon name="arrow_right" width={24} height={24} />
			</button>
		</Container>
	);
}
