export default {
  launch: {
    headless: false,
    slowMo: 20,
    defaultViewport: { width: 1280, height: 720 },
    args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
  },
  browserContext: 'default',
  exitOnPageError: false,
};
