const btnLogin = $('#btn-logind');
let submitPreventDefault = true;
btnLogin.disabled = true;

const loadingTopEmail = $('.loading-effect-top');
const loadingMain = $('.loading-ss');

const loginJavaScript = {
    element: () => {
        return {
            email: $('input[name="email"]'),
            password: $('input[name="password"]'),
        };
    },

    loadding: (type) => {
        const loadingMain = $('.loading-ss');
        TypeClass.class(type === 'off' ? 'remove' : 'add', loadingMain, 'loading');
    },

    checkInput: (input, type = null) => {
        const elements = loginJavaScript.element();
        let message = null;

        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value))
                    message = "Địa chỉ email không hợp lệ.";

            case 'pass':
                if (input.value.length < 8)
                    message = "Mật khẩu cần ít nhất 8 ký tự.";
        }

        if (!input.value.trim())
            message = 'Không được để trống';

        const parent = input.parentNode;
        const existingAlert = parent.querySelector('.Form-message-error');

        if (message) {
            if (existingAlert) existingAlert.remove();
            const alert = `
                <span class="Form-message-error">
                    ${message}
                </span>`;
            parent.insertAdjacentHTML('beforeend', alert);
        }
        else if (existingAlert) {
            existingAlert.remove();
        }

        if (loginJavaScript.checkLogin()) {
            btnLogin.disabled = false;
            TypeClass.class('add', btnLogin, 'on');
        }
        else {
            btnLogin.disabled = true;
            TypeClass.class('remove', btnLogin, 'on');
        }
    },

    checkLogin: () => {
        const elements = loginJavaScript.element();

        const email = elements.email.value.trim();
        const password = elements.password.value.trim();

        if (!email || !password) { return false; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { return false; }

        if (password.length < 8) { return false; }

        return true;
    },

    loginAccept: () => {
        loginJavaScript.loadding('on');
        const elements = loginJavaScript.element();
        const data = {
            email: elements.email.value,
            password: elements.password.value,
        };

        CallAjax.post('/Account/LoginAccept', data)
        .then(response => {
            if (response && response.code === 1) {
                loginJavaScript.loginRedirect();
            }
            else {
                cuteAlert({
                    type: "error",
                    title: "Thất bại",
                    message: response.message,
                    timer: 3500
                });
            }
            loginJavaScript.loadding('off');
        })
        .catch(error => {
            cuteAlert({
                type: "error",
                title: "Lỗi",
                message: `Đã xảy ra lỗi: ${error.message}`,
                buttonText: "Đóng",
            });
            loginJavaScript.loadding('off');
        });
    },

    loginRedirect: () => {
        cuteAlert({
            type: "success",
            title: "Thành công",
            message: 'Đã đăng nhập thành công.',
            buttonText: "Đóng",
        }); 
    },

    handleEvents: () => {
        const elements = loginJavaScript.element();

        document.addEventListener('DOMContentLoaded', () => {
            btnLogin.addEventListener('click', function (event) {
                event.preventDefault();
                loginJavaScript.loginAccept();
            });

            elements.email.addEventListener('blur', () => {
                loginJavaScript.checkInput(elements.email, 'email');
            });

            elements.password.addEventListener('blur', () => {
                loginJavaScript.checkInput(elements.password, 'pass');
            });
        });
    },

    start: () => {
        loginJavaScript.handleEvents();
    }
};

loginJavaScript.start();