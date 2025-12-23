export const BR_URL = 'http://localhost:4100/';

export const TEST_DATA = {
    EMAIL: 'test@example.com',
    PASSWORD: 'TestPassword123!',
};

export const SELECTORS = {
    NAVBAR: 'nav.navbar',
    NAVBAR_BRAND: 'nav.navbar .navbar-brand',
    REGISTER_LINK: 'a[href="/register"]',
    LOGIN_LINK: 'a[href="/login"]',
    SETTINGS_LINK: 'a[href="/settings"]',
    EDITOR_LINK: 'a[href="/editor"]',
    USER_PROFILE_LINK: (username: string) => `a[href="/@${username}"]`,

    USERNAME_INPUT: 'input[placeholder="Username"]',
    EMAIL_INPUT: 'input[placeholder="Email"]',
    PASSWORD_INPUT: 'input[placeholder="Password"]',
    SUBMIT_BUTTON: 'button[type="submit"]',

    ARTICLE_TITLE_INPUT: 'input[placeholder="Article Title"]',
    ARTICLE_DESCRIPTION_INPUT: 'input[placeholder="What\'s this article about?"]',
    ARTICLE_BODY_TEXTAREA: 'textarea[placeholder="Write your article (in markdown)"]',
    ARTICLE_TAGS_INPUT: 'input[placeholder="Enter tags"]',
    PUBLISH_BUTTON: 'button.btn-primary',

    TAG_LIST: '.tag-list',
    TAG_PILL: '.tag-list a.tag-pill',
    LOGOUT_BUTTON: 'button.btn-outline-danger',
    ARTICLE_PREVIEW: '.article-preview',
    ARTICLE_PREVIEW_TITLE: '.article-preview h1',
};