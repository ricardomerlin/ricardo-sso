document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const clearButton = document.querySelector('.clearTokens');

    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }

    const attemptLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (window.SPOTIM && window.SPOTIM.startSSO) {
                    console.log('YES IT STARTED')
                    startSSO();
                } else {
                    console.log('ADDED THAT EVENT LISTENER')
                    document.addEventListener('spot-im-api-ready', startSSO, false);
                }

                document.addEventListener('spot-im-renew-sso', startSSO, false);
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    function startSSO() {

        const user = JSON.parse(localStorage.getItem('user'))

        var callback = function(codeA, completeSSOCallback) {        

            fetch('http://localhost:3001/start-handshake', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    code_a: codeA,
                    user: user
                  }),
            }).then(res => res.text()).then(codeB => {
                console.log('HERE IS THE CODE B WE RECEIVE',codeB)
                if(codeB){
                    console.log('WE RECEIVED A CODE B',codeB)
                    completeSSOCallback(codeB)
                    console.log('WE JUST COMPLETED THE SSO CALLBACK')
                    return codeB;
                }
            }).catch(err => {
                completeSSOCallback(null, err)
            });
        };
        window.SPOTIM.startSSO({
            callback: callback,
            user: user
        })        
    }
    const login = (userToken) => {
        startTTH({ userToken, performBEDHandshakeCallback });
      };

    const clearTokens = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Tokens cleared!');
        alert('Tokens have been cleared.');
    };

    loginForm.addEventListener('submit', function (event) {
        console.log('Form submission detected');
        event.preventDefault();
        console.log('Prevented form submission');

        const usernameInput = loginForm.querySelector('input[type="text"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        console.log('Username:', username);
        console.log('Password:', password);

        attemptLogin(username, password);
    });

    if (clearButton) {
        clearButton.addEventListener('click', clearTokens);
    } else {
        console.error('Clear Tokens button not found!');
    }
});
