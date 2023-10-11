// Function to wait for an element with the given selector to exist in the DOM
function waitForElementToExist(selector) {
    return new Promise(resolve => {
        // If the element already exists, resolve the promise immediately
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        // Create a MutationObserver to watch for changes in the DOM
        const observer = new MutationObserver(() => {
            // Check if the element with the given selector now exists
            if (document.querySelector(selector)) {
                // If it exists, resolve the promise and disconnect the observer
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        // Start observing changes in the body of the document
        observer.observe(document.body, {
            subtree: true,
            childList: true,
        });
    });
}

// Greetings in different languages
var greetings = {
    "id_id": "Halo",
    "de_de": "Hallo",
    "en_us": "Hello",
    "es_es": "Hola",
    "fr_fr": "Bonjour",
    "it_it": "Ciao",
    "pt_br": "Olá",
    "th_th": "สวัสดี",
    "zh_cn": "你好",
    "zh_tw": "你好",
    "ja_jp": "こんにちは",
    "ko_kr": "안녕하세요",
    "ms_my": "Helo",
    "nb_no": "Hei",
    "sr_rs": "Здраво",
    "da_dk": "Hej",
    "et_ee": "Tere",
    "fil_ph": "Kamusta",
    "hr_hr": "Bok",
    "lv_lv": "Sveiki",
    "lt_lt": "Sveiki",
    "hu_hu": "Helló",
    "nl_nl": "Hallo",
    "pl_pl": "Cześć",
    "ro_ro": "Salut",
    "sq_al": "Përshëndetje",
    "sl_sl": "Zdravo",
    "sk_sk": "Ahoj",
    "fi_fi": "Hei",
    "sv_se": "Hej",
    "vi_vn": "Xin chào",
    "tr_tr": "Merhaba",
    "uk_ua": "Привіт",
    "cs_cz": "Ahoj",
    "el_gr": "Γειά σας",
    "bs_ba": "Zdravo",
    "bg_bg": "Здравейте",
    "ru_ru": "Привет",
    "kk_kz": "Сәлеметсіздерге",
    "ar_001": "مرحبًا",
    "hi_in": "नमस्ते",
    "bn_bd": "হ্যালো",
    "si_lk": "හෙලෝ",
    "my_mm": "မင်္ဂလာ",
    "ka_ge": "გამარჯობა",
    "km_kh": "ជំរាប"
};

// Immediately invoked async function expression (IIFE)
(async () => {
    try {
        // Find the meta tag with the name "user-data"
        var userDataMeta = document.querySelector('meta[name="user-data"]');

        // Extract user data attributes or use default values if they don't exist
        var userId = userDataMeta.getAttribute('data-userid') || '1';
        var name = userDataMeta.getAttribute('data-name') || 'Name';
        var displayName = userDataMeta.getAttribute('data-displayname') || 'DisplayName';
        var isUnder13 = userDataMeta.getAttribute('data-isunder13') === "true";
        var created = userDataMeta.getAttribute('data-created') || '1/1/2009 1:00:00 AM';
        var isPremiumUser = userDataMeta.getAttribute('data-ispremiumuser') === "true";
        var hasVerifiedBadge = userDataMeta.getAttribute('data-hasverifiedbadge') === "true";


        // Find the meta tag with the name "locale-data"
        var userLocaleDataMeta = document.querySelector('meta[name="locale-data"]');

        // Extract user locale data attributes or use default values if they don't exist
        var languageCode = userLocaleDataMeta.getAttribute('data-language-code') || 'en_us';
        var languageName = userLocaleDataMeta.getAttribute('data-language-name') || 'English';

        // Get greeting text from the language code
        var greeting = greetings[languageCode] || "Hello";

        
        // Wait for the avatar image element to exist
        var avatarUrl = await waitForElementToExist("#navigation .avatar img");

        // Update the HTML content of a specific element with user data and avatar
        document.querySelector("#HomeContainer > div.section > div").innerHTML = `
            <h1>
                <a class="avatar avatar-card-fullbody" style="margin-right:15px;width:128px;height:128px;" href="/users/${userId}/profile">
                    <span class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot" style="width:128px;height:128px;">
                        <thumbnail-2d class="avatar-card-image">
                            <span class="thumbnail-2d-container">
                                <img src="${avatarUrl?.src}" style="background-color: #d4d4d4;"></img>
                            </span>
                        </thumbnail-2d>
                    </span>
                </a>
                ${isPremiumUser ? '<span class="icon-premium-medium" style="margin-right: 10px;"></span>' : ""}
                <a href="/users/${userId}/profile" class="user-name-container">${greeting}, ${displayName}!</a>
            </h1>
        `;
    } catch (error) {
        // Log the error to the console
        console.error(error);
    }
})();