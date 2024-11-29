const partDropdown = $('#part-dropdown');
const menuBar = $('.MobileMenu_wrapper');
const headerCenter = $('#header_center');
const directional = $('#directional');

const searchHeader = $('.search-click');
const btnRemoveShowHeaderSearch = $('#remove-pattern');

const headerElement = $('.wrapper-header');
const elementsToChangeColor = $$('header a,  header span, header .search-click');

const topicSystem = $('.topic-system');

// Wrapper Infomatino User 
const avatarUserHeader = $('#detailUserHeader');
const contentInfo = $('.infomation .content');

// Handle Header Topic 
const topicHeader = $('.item-topic');

// end Hover Topic
const containerSearch = $('.container-search');

const bellHeader = $('.bell-click');

function prepareActionClass(wrapper, type) {
    const identifyAction = (type === 'add') ? 'add' : 'remove';
    TypeClass.class(identifyAction, wrapper, 'show')
}

function prepareClassHeaderSerach(type) {
    const identify = (type === 'add') ? 'add' : 'remove';
    const identifyScroll = (type === 'add') ? 'yes' : 'no';
    TypeClass.class(identify, containerSearch, 'show');
    NoScrollHTML.noScroll(identifyScroll);
}

function prepareClassActiveHeader(type) {
    const identifyColor = (type === 'add') ? '#464646' : '';
    const identifySearch = (type === 'add') ? '#3333331f' : '';
    const identifyLine = (type === 'add') ? '2px solid #ff6000' : '';
    searchHeader.style.background = identifySearch;
}

function prepareScrollHeader(scrollPosition) {
    const identify = (scrollPosition >= 439) ? 'add' : 'remove';
    const color = (identify === 'add') ? 'rgba(3,3,3)' : '';

    TypeClass.class(identify, headerElement, 'plus');
    elementsToChangeColor.forEach(text => {
        text.style.color = color;
    });
    prepareClassActiveHeader(identify);
}

// On Off navbar
function classNavbar(type) {
    const identify = (type === 'add') ? 'add' : 'remove';
    TypeClass.class(identify, headerCenter, 'show-center');
    TypeClass.class(identify, directional, 'show-direc');
}

function togglePartDropdown() {
    TypeClass.class('toggle', partDropdown, 'show-mobile');
    TypeClass.class('toggle', $('html'), 'noscroll')
}

// Keyword search tips
const inputSearch = $('input[name="q"]');
const tippyModuleWrapper = $('.tippy-module-wrapper');
const tippyModuleWrapperLists = $('.tippy-module-wrapper .lists');

function renderSearchTips(data) {
    const dataPathUpload = GetDataElement.get(tippyModuleWrapperLists, 'data-path-upload');

    var html = data.reduce((result, item) => {
        const arrayImages = item.images.split("||");
        const image = arrayImages[0];
        const srcImage = dataPathUpload + image;
        return (
            result +
            `<li class="item-suggest">
                <a href="/usego/powerpoint/detail?id=${item.id}">
                    <img src="${srcImage}" width="20">
                    <span>${item.title}</span>
                </a>
            </li>`
        );
    }, '');

    tippyModuleWrapperLists.innerHTML = DOMPurify.sanitize(html, { RETURN_TRUSTED_TYPE: true });
}

function keySearchTips(value) {
    // Get data 
    const data = {
        'valuesearch': value,
        'class': 'searchtips'
    };

    CallAjax.send('POST', data, 'HandleSearch.php', (response) => {
        const dataJson = CallAjax.get(response, 'off').err_mess;
        try {
            renderSearchTips(dataJson);
        } catch (error) {
            tippyModuleWrapperLists.innerHTML = DOMPurify.sanitize(`Không có kết quả cho '${value}'`, { RETURN_TRUSTED_TYPE: true });
        }
    });
}

function handleValueSearch(value) {
    // If another value then perform a search
    if (value.trim() !== '' && value.length > 1) {
        keySearchTips(value.trim());
        TypeClass.class('add', tippyModuleWrapper, 'show');

        // Close suggestion
        const closeSuggestions = (event) => {
            // Check if target element belongs to tippyModuleWrapper
            if (!tippyModuleWrapper.contains(event.target) && event.target !== inputSearch) {
                TypeClass.class('remove', tippyModuleWrapper, 'show');
            }
        };

        containerSearch.onclick = closeSuggestions;
        // Remove the event listener to avoid memory leaks
        inputSearch.removeEventListener('click', closeSuggestions);
    } else {
        TypeClass.class('remove', tippyModuleWrapper, 'show');
    }
}

const handleSearchNavigation = () => {
    history.pushState(null, null, `/usego/search?q=`);
};

const btnHeaderSearch = $('#btn-header-search');
const tippySeemore = $('.tippy-seemore');

const headerJavascript = {
    handleEvents: () => {
        document.addEventListener('DOMContentLoaded', () => {
            // Close 
            document.addEventListener('click', (event) => {
                if (RootDetectMob.check()) {
                    if (!contentInfo.contains(event.target) && !avatarUserHeader.contains(event.target)) {
                        contentInfo.classList.remove('showMobile');
                    }
                }
            });

            // Show topic on pc 
            if (!RootDetectMob.check()) {
                topicHeader.addEventListener('mouseenter', () => prepareActionClass(partDropdown, 'add'));
                // On hover
                topicHeader.addEventListener('mouseleave', () => prepareActionClass(partDropdown, 'remove'));
                // No hover
            };

            // Set click event for avatarUserHeader
            avatarUserHeader.addEventListener('click', (event) => {
                if (RootDetectMob.check()) {
                    event.stopPropagation();
                    contentInfo.classList.toggle('showMobile');
                }
            });

            // Handle Show Search 
            searchHeader.onclick = () => prepareClassHeaderSerach('add');

            // Handle remove Search 
            btnRemoveShowHeaderSearch.onclick = () => prepareClassHeaderSerach('remove');

            // Background color white navbar when scroll 
            window.addEventListener('scroll', () => {
                let scrollPosition = window.scrollY;
                prepareScrollHeader(scrollPosition);
            });

            menuBar.addEventListener('click', () => {
                // Prevent external click event
                classNavbar('add');

                // Use on click the body to close navbar 
                headerCenter.addEventListener('click', (event) => {
                    if (event.target === headerCenter) {
                        classNavbar('remove')
                    }
                });
            });

            topicHeader.onclick = () => { togglePartDropdown() };

            inputSearch.oninput = RootDebounces.listen((event) => {
                const value = event.target.value;
                handleValueSearch(value);
            }, 300);

            inputSearch.onfocus = () => {
                console.log(inputSearch.value);
                const value = inputSearch.value;
                handleValueSearch(value);
            };

            btnHeaderSearch.onclick = handleSearchNavigation;
            tippySeemore.onclick = handleSearchNavigation;

        });
    },

    start: () => {
        headerJavascript.handleEvents();
    }
}

headerJavascript.start();