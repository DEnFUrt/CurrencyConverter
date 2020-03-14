
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

    //Вариант с XMLHttpRequest
    const getCurrentRubToUsd = () => {
    return new Promise( (resolve, reject) => {
        let request = new XMLHttpRequest();
        
        request.open('GET', 'js/current.json');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        request.onload = () => {
            if (request.status !=200) {
                reject(new Error(`Ошибка ${request.status}: ${request.statusText}`));
            } else {
                let data = JSON.parse(request.response);
                resolve(data);
            }
        };

        request.onerror = () => reject(new Error('Что-то пошло не так!'));
    
        request.send();
    });
};

inputRub.addEventListener('input', () => {
    getCurrentRubToUsd()
        .then(data => inputUsd.value = (inputRub.value / data.usd).toFixed(4))
        .catch(error => inputUsd.value = error.message);

})

//Вариант с fetch
const getCurrentUsdToRub = async () => {
    try {
        let response = await fetch('js/current.json');
        let data = await response.json();
        inputRub.value = (inputUsd.value / data.rub).toFixed(4);
    } catch(error) {
        inputRub.value = error.message;
    }
};

inputUsd.addEventListener('input', getCurrentUsdToRub);



    /* inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();
    
    request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputUsd.value = inputRub.value / data.usd;
        } else {
            inputUsd.value = "Что-то пошло не так!";
        }
    });

}); */
