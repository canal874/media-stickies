/**
 * @license Media Stickies
 * Copyright (c) Hidekazu Kubota
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import { AppSettingsContext, AppSettingsProvider, MessageContext } from './StoreProvider';
import './SettingPageSave.css';
import { MenuItemProps } from './MenuItem';
import { SettingPageTemplate } from './SettingPageTemplate';

export interface SettingPageSaveProps {
  item: MenuItemProps;
  index: number;
}

export const SettingPageSave = (props: SettingPageSaveProps) => {
  const MESSAGE = React.useContext(MessageContext).MESSAGE;

  const [appSettingsState, appSettingsDispatch]: AppSettingsProvider = React.useContext(
    AppSettingsContext
  );

  return (
    <SettingPageTemplate item={props.item} index={props.index}>
      <p>{MESSAGE('saveDetailedText')}</p>
      <input type='radio' styleName='locationSelector' checked />
      <div styleName='saveFilePath'>
        {MESSAGE('saveFilePath')}: {appSettingsState.settings.cardDir}
      </div>
      <button styleName='saveChangeFilePathButton'>
        {MESSAGE('saveChangeFilePathButton')}
      </button>
    </SettingPageTemplate>
  );
};
