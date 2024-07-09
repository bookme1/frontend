import Image from 'next/image';

import aiModal from './AiContent.module.css';
import AiContentMessage from '@/components/Modals/ModalContent/AiContent/AiContentMessage';

const AiContent = () => {
  return (
    <div className={aiModal.ai_content_wrapper}>
      <div className={aiModal['ai-content-header']}>
        <div>
          <h2>Привіт</h2>
          <h3>Як я можу тобі допомогти?</h3>
        </div>
        {/*<Image src={} alt={}/>*/}
      </div>
      <div className={aiModal['ai-content-description']}>
        Я помічник, створений на основі штучного інтелекту і я допоможу тобі
        вибрати книгу.
      </div>
      <div className={aiModal['ai-content-body']}>
        <AiContentMessage>
          {' '}
          Я помічник, створений на основі штучного інтелекту і я допоможу тобі
          вибрати книгу.
        </AiContentMessage>
        <div className={aiModal['message-form-block']}>
          <form className={aiModal['message-form']}>
            <input type="text" placeholder="Повідомлення" />
            <button type="submit">Надіслати</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiContent;
