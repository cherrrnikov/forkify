// File which contains helper functions those we will use over and over in project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await result.json();

    if (!result.ok) {
      throw new Error(`${data.message} (${result.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await result.json();

    if (!result.ok) {
      throw new Error(`${data.message} (${result.status})`);
    }
    return data;
  } catch (err) {
    //   Re-throwing error для того чтобы ошибка читалась не здесь, а в другой асинхронной функции
    //  где используется эта функция
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await result.json();

    if (!result.ok) {
      throw new Error(`${data.message} (${result.status})`);
    }
    return data;
  } catch (err) {
    //   Re-throwing error для того чтобы ошибка читалась не здесь, а в другой асинхронной функции
    //  где используется эта функция
    throw err;
  }
};
*/
