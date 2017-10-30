import './themes/normalize.css';
import './themes/style.css';
import React from 'react';
import App from './utils/createApp';
import models from './models';
import Root from './containers/Root';

const app = new App();
app.useModels(models);
app.useRoot(<Root />);
app.start('app');
