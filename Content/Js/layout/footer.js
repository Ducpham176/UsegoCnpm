// show newFeed 
const modalOverlay = $('.modal-overlay');
const modalContent = $('.modal-content');

// New feed button 
const btNewFeed = $('.item-new-feed');
const btCloseNewFeed = $('.close-new-feed');

// Logout button 
const btAccpectBox = $('#btn-accpect-box');
const btCancelBox = $('#btn-cancel-box');

const btnLogoutUsego = $('.logout-usego');

const footerJavascript = {
    contentChangeRules: async () => {
        try {
            const data = { class: 'GetHotNewFeed' }; // Định nghĩa data ở đây
            const response = await new Promise((resolve, reject) => {
                CallAjax.send('POST', data, 'HandleInstruct.php', function (response) {
                    const dataJson = CallAjax.get(response, 'off').err_mess;
                    if (dataJson) {
                        resolve(dataJson);
                    }
                });
            });
            return response;
        } catch (error) {
            console.error('Error fetching new feed:', error);
            return null;
        }
    },

    handleEvents: () => {
        document.addEventListener('DOMContentLoaded', () => {
            btNewFeed.onclick = async (e) => {
                AlertUsego.identify('yes');

                const data = await footerJavascript.contentChangeRules();

                const content = data.map(item => `
                    <article>
                        <h3><a href="/usego/instruct/read?id=${item.id}">🔥 ${item.title}</a></h3>
                        <p>${item.content}</p>
                    </article>
                `).join('');

                if (data) {
                    AlertUsego.show('Thông Báo', content);
                } else {
                    AlertUsego.show("Lỗi", "Không lấy được dữ liệu");
                }
            };

            modalOverlay.onclick = (e) => {
                if (e.target == e.currentTarget) {
                    btCloseNewFeed.click();
                }
            };

            btCloseNewFeed.onclick = () => {
                AlertUsego.identify('no');
            };

            btnLogoutUsego.onclick = () => {
                cuteAlert({
                    type: "question",
                    title: "Xác nhận yêu cầu",
                    message: "Bạn có chắc muốn đăng xuất",
                    confirmText: "Xác nhận",
                    cancelText: "Hủy bỏ"
                }).then((e) => {
                    if (e == "confirm") {
                        window.location.href = '/usego/account/logout';
                    }
                });
            };
        });
    },

    start: () => {
        footerJavascript.handleEvents();
    }
};

footerJavascript.start();