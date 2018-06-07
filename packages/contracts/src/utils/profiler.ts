import { devConstants } from '@0xproject/dev-utils';
import { ProfilerSubprovider, SolCompilerArtifactAdapter } from '@0xproject/sol-cov';
import * as _ from 'lodash';

let profilerSubprovider: ProfilerSubprovider;

export const profiler = {
    getProfilerSubproviderSingleton(): ProfilerSubprovider {
        if (_.isUndefined(profilerSubprovider)) {
            profilerSubprovider = profiler._getProfilerSubprovider();
        }
        return profilerSubprovider;
    },
    _getProfilerSubprovider(): ProfilerSubprovider {
        const defaultFromAddress = devConstants.TESTRPC_FIRST_ADDRESS;
        const solCompilerArtifactAdapter = new SolCompilerArtifactAdapter();
        const isVerbose = true;
        const subprovider = new ProfilerSubprovider(solCompilerArtifactAdapter, defaultFromAddress, isVerbose);
        return subprovider;
    },
};
