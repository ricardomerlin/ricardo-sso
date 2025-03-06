document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.login-form');
    const clearButton = document.querySelector('.clearTokens');
    const logoutButton = document.querySelector('.logout');

    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("profileImage").src = user.imageURL;
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileUsername").textContent = user.username;
        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profileEmailVerified").textContent = user.email_verified ? "Yes" : "No";

        document.querySelector("a[href='login.html']").style.display = "none";
        document.querySelector("a[href='signup.html']").style.display = "none";
    } else {
        document.getElementById("profileInfo").innerHTML = "<p class='no-profile'>No profile information available.</p>";
    }
    

    const attemptLogin = async (username = null, password = null) => {
        console.log('LOGIN IS BEING ATTEMPTED');
        
        if (!localStorage.getItem('user')) {
            console.log('LOCAL STORAGE TOKEN WAS NOT FOUND');
            if (!username || !password) {
                console.log('No credentials provided for login attempt.');
                return; // Prevent login if no credentials are available on page load
            }
            
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

                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    startSSO();
                } else {
                    alert('Login failed. Please check your credentials.');
                    displayLoginSignup()
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        } else {
            console.log('LOCAL STORAGE TOKEN WAS FOUND, YAY');
            startSSO();
        }
    };

    function startSSO() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            console.error('No user found in localStorage');
            return;
        }

        var callback = function (codeA, completeSSOCallback) {
            fetch('http://localhost:3001/start-handshake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code_a: codeA, user: user }),
            })
                .then(res => res.text())
                .then(codeB => {
                    console.log('HERE IS THE CODE B WE RECEIVE', codeB);
                    if (codeB) {
                        completeSSOCallback(codeB);
                        console.log('WE JUST COMPLETED THE SSO CALLBACK');
                    }
                })
                .catch(err => {
                    completeSSOCallback(null, err);
                });
        };

        window.SPOTIM.startSSO({
            callback: callback,
            user: user,
        });
    }

    const handleLogout = () => {
        console.log('LOGGING OUT');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        if (window.SPOTIM && window.SPOTIM.logout) {
            window.SPOTIM.logout();
        } else {
            document.addEventListener('spot-im-api-ready', function () {
                window.SPOTIM.logout();
            }, false);
        }
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

        const usernameInput = loginForm.querySelector('input[type="text"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        attemptLogin(username, password);
    });

    document.addEventListener('spot-im-login-start', function () {
        console.log('HEADED TO THE LOGIN SCREEN');
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearTokens);
    } else {
        console.error('Clear Tokens button not found!');
    }

    attemptLogin();
});