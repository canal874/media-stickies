/**
 * @license Media Stickies
 * Copyright (c) Hidekazu Kubota
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import './SettingsDialogTitle.css';
import { MessageLabel } from '../modules_common/i18n';
import {
  GlobalContext,
  SettingsDialogContext,
  SettingsDialogProvider,
} from './StoreProvider';
import { MenuItemProps } from './MenuItem';
import { cardColors, ColorName, darkenHexColor } from '../modules_common/color';

export interface SettingsDialogTitleProps {
  title: MessageLabel;
  items: MenuItemProps[];
}

export const SettingsDialogTitle = (props: SettingsDialogTitleProps) => {
  const globalState = React.useContext(GlobalContext);
  const [settingsDialogState, dispatch]: SettingsDialogProvider = React.useContext(
    SettingsDialogContext
  );
  const activeItem: MenuItemProps | undefined = props.items.find(
    item => item.id === settingsDialogState.activeSettingId
  );
  let style;
  if (activeItem !== undefined) {
    style = {
      backgroundColor: darkenHexColor(cardColors[activeItem.color], 0.9),
    };
  }
  else {
    style = {};
  }

  const close = () => {
    window.close();
  };

  return (
    <div>
      <h1 styleName='pin' style={style}></h1>
      <h1 styleName='title'>
        <div styleName='draggable'>
          <div style={{ float: 'left' }}>
            <span style={{ color: '#909090' }} className='fas fa-cog'></span>&nbsp;&nbsp;
            {globalState.MESSAGE(props.title)}
          </div>
        </div>
        <div styleName='closeButton' onClick={close}>
          <span className='fas fa-window-close'></span>
        </div>
      </h1>
    </div>
  );
};
