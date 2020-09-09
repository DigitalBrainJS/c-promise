import CPromise from '../lib/c-promise';
import {ProtectAPI} from './protect';

ProtectAPI(CPromise.prototype, ['label', 'weight', 'timeout'], 'CPromise');
ProtectAPI(CPromise.CPromiseScope.prototype, ['label', 'weight', 'timeout'], 'PromiseScope');

export default CPromise;
