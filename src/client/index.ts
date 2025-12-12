import { Plugin } from '@nocobase/client';
import MssqlConfigForm from './components/MssqlConfigForm';

export class ExternalMssqlClientPlugin extends Plugin {
  async load() {
    this.app?.dataSourceManager?.addConfigComponent?.('mssql-external', MssqlConfigForm);
  }
}

export default ExternalMssqlClientPlugin;
