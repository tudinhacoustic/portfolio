document.querySelector('form.form').addEventListener('submit', function(e) {
    e.preventDefault();
    let x = document.querySelector('form.form').elements;
    const xhr = new XMLHttpRequest();
    const userName = x['name'].value;
    const email = x['email'].value;
    const subject = x['subject'].value;
    const message = x['message'].value;
    if (!userName) {
        document.getElementById('get-message').innerHTML = `<div class="alert alert-danger" role="alert">Please enter you name</div>`;
        setTimeout(function () {
            document.getElementById('get-message').innerHTML = "";
        }, 3000);
        return false;
    }
    if (!email) {
        document.getElementById('get-message').innerHTML = `<div class="alert alert-danger" role="alert">Please enter you email</div>`;
        setTimeout(function () {
            document.getElementById('get-message').innerHTML = "";
        }, 3000);
        return false;
    }
    if (!subject) {
        document.getElementById('get-message').innerHTML = `<div class="alert alert-danger" role="alert">Please enter you subject</div>`;
        setTimeout(function () {
            document.getElementById('get-message').innerHTML = "";
        }, 3000);
        return false;
    }
    if (!message) {
        document.getElementById('get-message').innerHTML = `<div class="alert alert-danger" role="alert">Please enter you name</div>`;
        setTimeout(function () {
            document.getElementById('get-message').innerHTML = "";
        }, 3000);
        return false;
    }
    const resultMessage = `
Username: ${userName}
Email: ${email}
Subject: ${subject}
Message: ${message}`;
    const urlSendRequest = `https://api.telegram.org/bot5861500747:AAGCUqFZHxpEvgI4kPlL6U0V3lht1O9Vpt4/sendMessage?chat_id=664743441`;

    xhr.open("POST", urlSendRequest, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        text: resultMessage,
    }))
    function readBody(xhr) {
        let data;
        if (!xhr.responseType || xhr.responseType === "text") {
            data = xhr.responseText;
        } else if (xhr.responseType === "document") {
            data = xhr.responseXML.ok;
        } else {
            data = xhr.response.ok;
        }
        return data;
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            const dataResponse = JSON.parse(readBody(xhr))
            const statusOk = dataResponse.ok;
            if(!statusOk) {
                document.getElementById('get-message').innerHTML = `<div class="alert alert-danger" role="alert">Your request is not accepted!</div>`;
                return false;
            }
            setTimeout(function () {
                document.getElementById('get-message').innerHTML = "";
            }, 3000);
        }
    }
    document.getElementById('get-message').innerHTML = `<div class="alert alert-success" role="alert">Your request accepted, I will respond in 2-3 business days.</div>`
    document.getElementById("telegram-contact-form").reset();
});