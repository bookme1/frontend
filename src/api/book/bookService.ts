import axios from 'axios';
import Notiflix from 'notiflix';

import { CreateOrderDTO, IOrderBook } from '@/lib/redux/features/order/types';
import { IBook } from '@/app/book/[id]/page.types';

class BookService {
    private baseURL: string | undefined;

    constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;
    }

    public async updateBooksFromServer() {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;
        const instance = axios.create({
            baseURL: BASE_URL,
            url: `api/book/updateBooksFromServer`,
        });
        try {
            await instance.post(`api/book/updateBooksFromServer`);
        } catch (error) {
            throw error;
        }
    }

    public async makeTestCheckout(amount: number, order_id: string) {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;
        const instance = axios.create({
            baseURL: BASE_URL,
        });

        try {
            const response = await instance.post(`/api/book/checkout`, null, {
                params: {
                    amount: Number(amount),
                    order_id: order_id,
                    description: 'Оплата за книги в магазині Bookme',
                },
            });

            const { data, signature } = response.data;

            // Динамічна завантаження LiqPayCheckout
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
                        const ifPaid = await bookService.checkIfPaid(order_id);
                        if (ifPaid) {
                            Notiflix.Notify.success('Дякуємо за покупку!');
                            const result = await bookService.makeDelivery(order_id);
                            console.log('RESULT');
                            console.log(result);
                            if (result == 'OK') {
                                Notiflix.Notify.success('Книжки були доставлені до бібліотеки!');
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
    }

    public async orderRequest(orderData: CreateOrderDTO, accessToken: string | null) {
        const url = `${this.baseURL}/api/order`;
        try {
            const response = await axios.post(
                url,
                {
                    order_id: orderData.order_id,
                    orderBooks: orderData.orderBooks,
                    amount: orderData.amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return response.data; // Можливо, вам потрібно повернути щось з відповіді
        } catch (error) {
            throw error;
        }
    }

    public async checkIfPaid(orderId: string) {
        const url = `${this.baseURL}/api/book/payment-status/${orderId}`;
        try {
            const response = await axios.get(url);
            if (response.data.status == 'sandbox') return true;

            return response.data; // Можливо, вам потрібно повернути щось з відповіді
        } catch (error) {
            throw error;
        }
    }

    public async makeWatermarking(formats: string, reference_number: string, order_id: string) {
        const url = `${this.baseURL}/api/book/watermarking`;
        try {
            const response = await axios.post(
                url,
                {
                    formats,
                    reference_number,
                    order_id,
                }
            );

            return response.data; // Можливо, вам потрібно повернути щось з відповіді
        } catch (error) {
            throw error;
        }
    }

    public async makeDelivery(order_id: string) {
        const url = `${this.baseURL}/api/book/deliver`;
        try {
            const response = await axios.post(
                url,
                {
                    transactionId: order_id,
                }
            );

            return response.data; // Можливо, вам потрібно повернути щось з відповіді
        } catch (error) {
            throw error;
        }
    }

    public async makeOrder(accessToken: string | null, uuid: string, formats: string, transactionId: string, reference_number: string, amount: number) {
        const orderedBooks: IOrderBook[] = [
            {
                reference_number: reference_number,
                ordered_formats: formats,
                transaction_id: transactionId,
                book: {
                    id: 'sampleBookId',
                    title: 'sampleBookTitle',
                    // додайте інші властивості, які має IBook
                } as IBook, 
                epubLink: 'sampleEpubLink',
                mobiLink: 'sampleMobiLink',
                pdfLink: 'samplePdfLink'
            },
        ];

        const createOrderDTO: CreateOrderDTO = {
            order_id: uuid,
            orderBooks: orderedBooks,
            amount: Number(amount),
        };

        const data = await this.orderRequest(createOrderDTO, accessToken);

        if (!data) {
            return false;
        } else if (data) {
            return true;
        }

        return undefined;
    }

    public async takeAllOrderedBooks(accessToken: string | null) {
        if (!accessToken) {
            return null;
        }
        const url = `${this.baseURL}/api/order/orderedBooks`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
}

export const bookService = new BookService();
