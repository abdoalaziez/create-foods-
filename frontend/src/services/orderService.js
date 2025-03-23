// import axios from 'axios';

// export const createOrder = async order => {
//   try {
//     const { data } = axios.post('/api/orders/create', order);
//     return data;
//   } catch (error) {}
// };

// export const getNewOrderForCurrentUser = async () => {
//   const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
//   return data;
// };

// export const pay = async paymentId => {
//   try {
//     const { data } = await axios.put('/api/orders/pay', { paymentId });
//     return data;
//   } catch (error) {}
// };

// export const trackOrderById = async orderId => {
//   const { data } = await axios.get('/api/orders/track/' + orderId);
//   return data;
// };

// export const getAll = async state => {
//   const { data } = await axios.get(`/api/orders/${state ?? ''}`);
//   return data;
// };

// export const getAllStatus = async () => {
//   const { data } = await axios.get(`/api/orders/allstatus`);
//   return data;
// };




import axios from 'axios';

const API_URL = '/api/orders';

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post(`${API_URL}/create`, order, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/newOrderForCurrentUser`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put(`${API_URL}/pay`, { paymentId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const trackOrderById = async (orderId) => {
  try {
    const { data } = await axios.get(`${API_URL}/track/${orderId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAll = async (state) => {
  try {
    const { data } = await axios.get(`${API_URL}/${state ?? ''}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllStatus = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/allstatus`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
