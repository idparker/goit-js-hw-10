import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('[name="delay"]');
const CreateBtn = document.querySelector('button');

const fulfilledInput = document.querySelector('[value="fulfilled"]');
const rejectedInput = document.querySelector('[value="rejected"]');

function notification(event) {
  event.preventDefault();
  let delay = delayInput.value;

  if (!delay) {
    iziToast.warning({
      message: 'Enter delay',
      position: 'topCenter',
      timeout: 3000,
      backgroundColor: '#FFA000',
    });

    return;
  }

  if (rejectedInput.checked) {
    setTimeout(
      () =>
        Promise.reject(
          iziToast.error({
            message: `Rejected promise in ${delay}ms`,
            messageColor: 'white',
            backgroundColor: '#EF4040',
            position: 'topRight',
            timeout: 3000,
            title: 'ERROR',
            titleColor: 'white',
          })
        ),
      delay
    );
  } else if (fulfilledInput.checked) {
    setTimeout(
      () =>
        Promise.resolve(
          iziToast.success({
            message: `Fulfilled promise in ${delay}ms`,
            messageColor: 'white',
            backgroundColor: '#59A10D',
            position: 'topRight',
            timeout: 3000,
            title: 'OK',
            titleColor: 'white',
          })
        ),
      delay
    );
  } else {
    alert('Select state (Fulfilled or Rejected)');
  }

  delayInput.value = '';
}

CreateBtn.addEventListener('click', notification);
