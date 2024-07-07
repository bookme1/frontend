import { randomUUID } from 'crypto';

import { useCreateOrderMutation } from '@/lib/redux/features/order/orderApi';

const usePayStatusHook = () => {
  const [createOrder, { data, isLoading, error }] = useCreateOrderMutation();

  const orderedBooks = [
    {
      reference_number: '',
      ordered_formats: '',
      transaction_id: '',
    },
    {
      reference_number: '',
      ordered_formats: '',
      transaction_id: '',
    },
  ];

  const createOrderDTO = {
    accessToken: '',
    order_id: randomUUID(),
    orderBooks: orderedBooks,
    user: 21,
    amount: 200,
  };

  createOrder(createOrderDTO);

  if (error) {
    return false;
  } else if (data) {
    return true;
  }

  return undefined;
};

export default usePayStatusHook;
