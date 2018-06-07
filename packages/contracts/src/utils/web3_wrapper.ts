import { devConstants, env, EnvVars, web3Factory } from '@0xproject/dev-utils';
import { prependSubprovider } from '@0xproject/subproviders';
import { Web3Wrapper } from '@0xproject/web3-wrapper';

import { coverage } from './coverage';
import { profiler } from './profiler';

enum ProviderType {
    Ganache = 'ganache',
    Geth = 'geth',
}

let testProvider: ProviderType;
switch (process.env.TEST_PROVIDER) {
    case undefined:
        testProvider = ProviderType.Ganache;
        break;
    case 'ganache':
        testProvider = ProviderType.Ganache;
        break;
    case 'geth':
        testProvider = ProviderType.Geth;
        break;
    default:
        throw new Error(`Unknown TEST_PROVIDER: ${process.env.TEST_PROVIDER}`);
}

const ganacheTxDefaults = {
    from: devConstants.TESTRPC_FIRST_ADDRESS,
    gas: devConstants.GAS_LIMIT,
};
const gethTxDefaults = {
    from: devConstants.TESTRPC_FIRST_ADDRESS,
};
export const txDefaults = testProvider === ProviderType.Ganache ? ganacheTxDefaults : gethTxDefaults;

const gethConfigs = {
    shouldUseInProcessGanache: false,
    rpcUrl: 'http://localhost:8501',
    shouldUseFakeGasEstimate: false,
};
const ganacheConfigs = {
    shouldUseInProcessGanache: true,
};
const providerConfigs = testProvider === ProviderType.Ganache ? ganacheConfigs : gethConfigs;

export const provider = web3Factory.getRpcProvider(providerConfigs);
const isCoverageEnabled = env.parseBoolean(EnvVars.SolidityCoverage);
const isProfilerEnabled = env.parseBoolean(EnvVars.SolidityProfiler);
if (isCoverageEnabled && isProfilerEnabled) {
    throw new Error(
        `Unfortunately for now you can't enable both coverage and profiler at the same time. They both use coverage.json file and there is no way to configure that.`,
    );
}
if (isCoverageEnabled) {
    const coverageSubprovider = coverage.getCoverageSubproviderSingleton();
    prependSubprovider(provider, coverageSubprovider);
}
if (isProfilerEnabled) {
    const profilerSubprovider = profiler.getProfilerSubproviderSingleton();
    prependSubprovider(provider, profilerSubprovider);
}

export const web3Wrapper = new Web3Wrapper(provider);
