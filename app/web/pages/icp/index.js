import '../../themes/normalize.css';
import '../../themes/style.css';
import App from '../../utils/createApp';
import models from '../../models';
import routes from '../../containers/Icp';

const app = new App();
app.useModels(models);
app.useRoot(routes);
app.start('app');
