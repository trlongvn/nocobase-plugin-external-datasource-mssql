import { Plugin } from '@nocobase/client';
import MssqlConfigForm from './components/MssqlConfigForm';

export class PluginExternalDatasourceMssqlClient extends Plugin {
  async load() {
    // Client-side registration APIs have changed in NocoBase 1.x; expose the configuration
    // component for host apps to wire manually.
    this.app.addComponents?.({ MssqlConfigForm });
  }
}

export default PluginExternalDatasourceMssqlClient;
