import cloneDeep from 'lodash/cloneDeep';
import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';
import AreaGridItem from '../components/Blocks/Grid/AreaGridItem';
import ClimaBlockInfo from 'volto-tremt-intranet/components/Blocks/Clima';

declare module '@plone/types' {
  export interface BlocksConfigData {
    climaBlock: BlockConfigBase;
  }
}

function installLocalBlocks(config: ConfigType) {
  config.blocks.blocksConfig.climaBlock = ClimaBlockInfo;
  return config;
}

function addBlocksToGridBlock(config: ConfigType, localBlocks: String[]) {
  ['gridBlock'].forEach((blockId) => {
    const block = (config.blocks.blocksConfig as any)[blockId];
    if (
      block !== undefined &&
      block.allowedBlocks !== undefined &&
      block.blocksConfig !== undefined
    ) {
      block.allowedBlocks = [...block.allowedBlocks, ...localBlocks];
      localBlocks.forEach((localBlockId) => {
        block.blocksConfig[localBlockId] = cloneDeep(
          config.blocks.blocksConfig[localBlockId],
        );
      });
    }
  });
  return config;
}

export default function install(config: ConfigType) {
  // Adiciona novos blocos
  installLocalBlocks(config);

  // Adiciona alguns blocos ao gridBlock
  addBlocksToGridBlock(config, ['climaBlock']);

  // Registra Componente para exibir uma Área quando a listagem for de Grade
  config.registerComponent({
    name: 'GridListingItemTemplate',
    component: AreaGridItem,
    dependencies: 'Area',
  });
  return config;
}
