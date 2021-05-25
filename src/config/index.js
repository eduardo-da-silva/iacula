import LocalStore from '@/localstore'

const config = new LocalStore({
    configName: 'user-preferences',
    defaults: {
        windowBounds: { width: 500, height: 900 },
        interval: 55000,
        showTime: 10000,
    }
});

export default config

