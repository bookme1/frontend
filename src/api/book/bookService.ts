
import axios, { AxiosRequestConfig } from 'axios';
import { IBook } from '@/app/book/[id]/page.types';
import { CreateOrderDTO, IOrderBook } from '@/lib/redux/features/order/types';
import { NotificationState } from '@/components/Notify/NotifyType';


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    withCredentials?: true;
}


export const useBookService = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '';



    // Функция для пополнения очереди книг
    const refillQueue = async () => {
        const instance = axios.create({
            baseURL,
            url: 'api/book/refillQueue',
        });
        try {
            return await instance.post('api/book/refillQueue');
        } catch (error) {
            throw error;
        }
    };

    // Функция для обновления книг с сервера
    const updateBooksFromServer = async () => {
        const instance = axios.create({
            baseURL,
            url: 'api/book/updateBooksFromServer',
        });
        try {
            return await instance.post('api/book/updateBooksFromServer');
        } catch (error) {
            throw error;
        }
    };

    // Функция для тестового оформления заказа
    const makeTestCheckout = async (
        amount: number,
        order_id: string,
        updateNotification: (newValues: Partial<NotificationState>) => void
    ) => {
        const instance = axios.create({ baseURL });
        try {
            const response = await instance.post('/api/book/checkout', null, {
                params: {
                    amount: Number(amount),
                    order_id: order_id,
                    description: 'Оплата за книги в магазині Bookme',
                },
            });

            const { data, signature } = response.data;

            // Динамічна завантаження LiqPayCheckout
            if (typeof window === 'undefined') {
                return 0;
            }

            const script = document.createElement('script');
            script.src = 'https://static.liqpay.ua/libjs/checkout.js';
            script.onload = () => {
                // @ts-ignore
                LiqPayCheckout.init({
                    data: data,
                    signature: signature,
                    embedTo: '#liqpay',
                    mode: 'popup', // або 'embed'
                })
                    .on('liqpay.callback', async function (data: any) {
                        const ifPaid = await checkIfPaid(order_id);
                        if (ifPaid) {
                            updateNotification({
                                isVisible: true,
                                text: 'Дякуємо за покупку!',
                                type: 'success',
                            });
                            const result = await makeDelivery(order_id);
                            console.log('RESULT', result);
                            if (result === 'OK') {
                                updateNotification({
                                    isVisible: true,
                                    text: 'Книжки були доставлені до бібліотеки!',
                                    type: 'success',
                                });
                            }
                        }
                    })
                    .on('liqpay.ready', function (data: any) {
                        // ready
                        console.log('ready');
                    })
                    .on('liqpay.close', function (data: any) {
                        // close
                        console.log('closed');
                    });
            };
            document.body.appendChild(script);

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Функция для оформления корзины
    const makeCartCheckout = async (    
        updateNotification: (newValues: Partial<NotificationState>) => void
    ) => {
        const instance = axios.create({ baseURL });

        try {
            const config: CustomAxiosRequestConfig = {
                withCredentials: true,
            };

            const response = await instance.post('/api/book/cart-checkout', {}, config);

            const { data, signature, order_id } = response.data;
            console.log('response data', response.data);

            // Динамічна завантаження LiqPayCheckout
            if (typeof window === 'undefined') {
                return 0;
            }

            const script = document.createElement('script');
            script.src = 'https://static.liqpay.ua/libjs/checkout.js';
            script.onload = () => {
                // @ts-ignore
                LiqPayCheckout.init({
                    data: data,
                    signature: signature,
                    embedTo: '#liqpay',
                    mode: 'popup', // або 'embed'
                })
                    .on('liqpay.callback', async function (data: any) {
                        const ifPaid = await checkIfPaid(data.order_id);
                        if (ifPaid) {
                            updateNotification({
                                isVisible: true,
                                text: 'Дякуємо за покупку!',
                                type: 'success',
                            });
                            const result = await makeDelivery(order_id);
                            console.log('RESULT', result);
                            if (result === 'OK') {
                                updateNotification({
                                    isVisible: true,
                                    text: 'Книжки були доставлені до бібліотеки!',
                                    type: 'success',
                                });
                            }
                        }
                    })
                    .on('liqpay.ready', function (data: any) {
                        // ready
                        console.log('ready');
                    })
                    .on('liqpay.close', function (data: any) {
                        // close
                        console.log('closed');
                        updateNotification({
                            isVisible: true,
                            text: 'Оплата була скасована.',
                            type: 'error',
                        });
                    });
            };
            document.body.appendChild(script);

            return response.data;
        } catch (error) {
            throw error;
        }
    };
 // Функция для оформления корзины c повторными запросвми
    const makeCartCheckoutWithRetry = async (
        updateNotification: (newValues: Partial<NotificationState>) => void,
        retries: number = 3, // Количество попыток
        delay: number = 1000 // Задержка между попытками в миллисекундах
    ) => {
        const instance = axios.create({ baseURL });
    
        // Функция для проверки наличия интернета
        const isOnline = () => {
            return window.navigator.onLine;
        };
    
        // Функция для выполнения запроса с повторными попытками
        const makeRequest = async () => {
            try {
                const config: CustomAxiosRequestConfig = {
                    withCredentials: true,
                };
    
                const response = await instance.post('/api/book/cart-checkout', {}, config);
    
                const { data, signature, order_id } = response.data;
                console.log('response data', response.data);
    
                // Динамічна завантаження LiqPayCheckout
                if (typeof window === 'undefined') {
                    return 0;
                }
    
                const script = document.createElement('script');
                script.src = 'https://static.liqpay.ua/libjs/checkout.js';
                script.onload = () => {
                    // @ts-ignore
                    LiqPayCheckout.init({
                        data: data,
                        signature: signature,
                        embedTo: '#liqpay',
                        mode: 'popup', // або 'embed'
                    })
                        .on('liqpay.callback', async function (data: any) {
                            const ifPaid = await checkIfPaid(data.order_id);
                            if (ifPaid) {
                                updateNotification({
                                    isVisible: true,
                                    text: 'Дякуємо за покупку!',
                                    type: 'success',
                                });
                                const result = await makeDelivery(order_id);
                                console.log('RESULT', result);
                                if (result === 'OK') {
                                    updateNotification({
                                        isVisible: true,
                                        text: 'Книжки були доставлені до бібліотеки!',
                                        type: 'success',
                                    });
                                }
                            }
                        })
                        .on('liqpay.ready', function (data: any) {
                            // ready
                            console.log('ready');
                        })
                        .on('liqpay.close', function (data: any) {
                            // close
                            console.log('closed');
                            updateNotification({
                                isVisible: true,
                                text: 'Оплата була скасована.',
                                type: 'error',
                            });
                        });
                };
                document.body.appendChild(script);
    
                return response.data;
            } catch (error) {
                throw error;
            }
        };
    
        // Попытки выполнения запроса
        for (let attempt = 1; attempt <= retries; attempt++) {
            if (!isOnline()) {
                console.log(`Попытка ${attempt}: Нет подключения к интернету`);
                // Ожидаем перед повторной попыткой
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                try {
                    const data = await makeRequest();
                    return data; // Успешный запрос
                } catch (error) {
                    console.log(`Попытка ${attempt} не удалась`);
                    // Если это была последняя попытка, выбрасываем ошибку
                    if (attempt === retries) {
                        updateNotification({
                            isVisible: true,
                            text: 'Не удалось выполнить запрос. Пожалуйста, проверьте ваше соединение и повторите попытку позже.',
                            type: 'error',
                        });
                        throw error;
                    }
                }
            }
        }
    };
    
    
    // Функция для создания заказа
    const orderRequest = async (orderData: CreateOrderDTO) => {
        const url = `${baseURL}/api/order`;
        try {
            const config: CustomAxiosRequestConfig = {
                headers: {

                },
                withCredentials: true, // Куки включены
            };

            const response = await axios.post(url, {
                order_id: orderData.order_id,
                orderBooks: orderData.orderBooks,
                amount: orderData.amount,
            }, config);

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Проверка, был ли оплачено
    const checkIfPaid = async (orderId: string) => {
        const url = `${baseURL}/api/book/payment-status/${orderId}`;
        try {
            const response = await axios.get(url);
            if (response.data.status === 'sandbox') return true;

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Добавление водяного знака
    const makeWatermarking = async (formats: string, reference_number: string, order_id: string) => {
        const url = `${baseURL}/api/book/watermarking`;
        try {
            const response = await axios.post(url, {
                formats,
                reference_number,
                order_id,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Доставка
    const makeDelivery = async (order_id: string) => {
        const url = `${baseURL}/api/book/deliver`;
        try {
            const response = await axios.post(url, {
                transactionId: order_id,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Добавление водяного знака для корзины
    const makeCartWatermarking = async (order_id: string) => {
        const url = `${baseURL}/api/book/cart-watermarking`;
        try {
            const response = await axios.post(url, {
                order_id,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Функция для создания заказа в корзине
    const makeOrder = async (
        // accessToken: string | null,
        uuid: string,
        formats: string,
        transactionId: string,
        reference_number: string,
        amount: number
    ) => {
        const orderedBooks: IOrderBook[] = [
            {
                reference_number: reference_number,
                ordered_formats: formats,
                transaction_id: transactionId,
                book: {
                    id: 'sampleBookId',
                    title: 'sampleBookTitle',
                    // добавьте другие свойства, которые имеет IBook
                } as IBook,
                epubLink: 'sampleEpubLink',
                mobiLink: 'sampleMobiLink',
                pdfLink: 'samplePdfLink',
            },
        ];

        const createOrderDTO: CreateOrderDTO = {
            order_id: uuid,
            orderBooks: orderedBooks,
            amount: Number(amount),
        };

        const data = await orderRequest(createOrderDTO);

        if (!data) {
            return false;
        } else if (data) {
            return true;
        }

        return undefined;
    };

    // Получить все заказанные книги
    const takeAllOrderedBooks = async (accessToken: string | null) => {
        if (!accessToken) return null;
        const url = `${baseURL}/api/order/orderedBooks`;
        try {
            const config: CustomAxiosRequestConfig = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true, // Куки включены
            };

            const response = await axios.get(url, config);

            return response.data;
        } catch (e) {
            console.error(e);
        }
    };

    return {
        refillQueue,
        updateBooksFromServer,
        makeTestCheckout,
        makeCartCheckout,
        orderRequest,
        checkIfPaid,
        makeWatermarking,
        makeDelivery,
        makeCartWatermarking,
        makeOrder,
        takeAllOrderedBooks,
        makeCartCheckoutWithRetry
    };
};
