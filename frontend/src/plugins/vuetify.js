import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                primary: '#ffffff',
                error: "#ff8888",
                success: "#45a5ae",
                secondary: '#44A1A0',
                accent: '#78CDD7',
            }
        }
    }
});

export default new Vuetify({
});
