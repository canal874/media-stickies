/**
 * @license Media Stickies
 * Copyright (c) Hidekazu Kubota
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import { AvatarProp, AvatarPropSerializable } from '../modules_common/cardprop';
import { setTitleMessage } from './card_renderer';
import { getCurrentDateAndTime } from '../modules_common/utils';
import { DialogButton } from '../modules_common/const';
import window from './window';

type task = {
  prop: AvatarPropSerializable;
  type: 'Save' | 'DeleteAvatar' | 'DeleteCard';
};

const unfinishedTasks: task[] = [];

export const waitUnfinishedTasks = (id: string) => {
  return new Promise((resolve, reject) => {
    if (unfinishedTasks.length > 0) {
      let timeoutCounter = 0;
      const checker = async () => {
        if (unfinishedTasks.length === 0) {
          resolve();
        }
        else if (timeoutCounter >= 10) {
          await window.api
            .confirmDialog(id, ['btnOK', 'btnCancel'], 'confirmWaitMore')
            .then((res: number) => {
              if (res === DialogButton.Default) {
                // OK
                timeoutCounter = 0;
              }
              else if (res === DialogButton.Cancel) {
                // Cancel
                reject(new Error('Canceled by user'));
              }
              else if (res === DialogButton.Error) {
                console.error('Error in confirm-dialog');
              }
            })
            .catch(() => {});
        }
        timeoutCounter++;
        setTimeout(checker, 500);
      };
      setTimeout(checker, 500);
    }
    else {
      resolve();
    }
  });
};

const execTask = async () => {
  if (unfinishedTasks.length === 1) {
    const task = unfinishedTasks[0];
    const timeout = setTimeout(() => {
      if (task.type === 'Save') {
        setTitleMessage('[saving...]');
      }
      else if (task.type === 'DeleteAvatar' || task.type === 'DeleteCard') {
        setTitleMessage('[deleting...]');
      }
    }, 1000);

    // Execute the first task
    if (task.type === 'Save') {
      await window.api.updateAvatar(task.prop).catch(e => {
        // TODO: Handle save error.
        console.error('Error in execTask:' + e);
      });
    }
    else if (task.type === 'DeleteCard') {
      await window.api.deleteCard(task.prop.url).catch(e => {
        // TODO: Handle save error.
        console.error('Error in execTask:' + e);
      });
    }
    else if (task.type === 'DeleteAvatar') {
      await window.api.deleteAvatar(task.prop.url).catch(e => {
        // TODO: Handle save error.
        console.error('Error in execTask:' + e);
      });
    }

    const finishedTask = unfinishedTasks.shift();
    console.debug(
      `Dequeue unfinishedTask: [${finishedTask?.type}] ${finishedTask?.prop.date.modifiedDate}`
    );
    clearTimeout(timeout);
    setTitleMessage('');
    if (unfinishedTasks.length > 0) {
      execTask();
    }
  }
};

export const saveCardColor = (
  avatarProp: AvatarProp,
  bgColor: string,
  uiColor?: string,
  opacity = 1.0
) => {
  if (uiColor === undefined) {
    uiColor = bgColor;
  }
  avatarProp.style.backgroundColor = bgColor;
  avatarProp.style.uiColor = uiColor;
  avatarProp.style.opacity = opacity;

  saveCard(avatarProp);
};

export const deleteCard = (avatarProp: AvatarProp) => {
  avatarProp.date.modifiedDate = getCurrentDateAndTime();
  const propObject = avatarProp.toObject();
  while (unfinishedTasks.length > 1) {
    const poppedTask = unfinishedTasks.pop();
    console.debug(
      `Skip unfinishedTask: [${poppedTask?.type}] ${poppedTask?.prop.date.modifiedDate}`
    );
  }
  console.debug(`Enqueue unfinishedTask: [Delete Card] ${propObject.date.modifiedDate}`);
  // Here, current length of unfinishedTasks should be 0 or 1.
  unfinishedTasks.push({ prop: propObject, type: 'DeleteCard' });
  // Here, current length of unfinishedTasks is 1 or 2.
  execTask();
};

export const deleteAvatar = (avatarProp: AvatarProp) => {
  avatarProp.date.modifiedDate = getCurrentDateAndTime();
  const propObject = avatarProp.toObject();
  while (unfinishedTasks.length > 1) {
    const poppedTask = unfinishedTasks.pop();
    console.debug(
      `Skip unfinishedTask: [${poppedTask?.type}] ${poppedTask?.prop.date.modifiedDate}`
    );
  }
  console.debug(`Enqueue unfinishedTask: [Delete Avatar] ${propObject.date.modifiedDate}`);
  // Here, current length of unfinishedTasks should be 0 or 1.
  unfinishedTasks.push({ prop: propObject, type: 'DeleteAvatar' });
  // Here, current length of unfinishedTasks is 1 or 2.
  execTask();
};

export const saveCard = (avatarProp: AvatarProp) => {
  avatarProp.date.modifiedDate = getCurrentDateAndTime();
  const propObject = avatarProp.toObject();
  while (unfinishedTasks.length > 1) {
    const poppedTask = unfinishedTasks.pop();
    console.debug(
      `Skip unfinishedTask: [${poppedTask?.type}] ${poppedTask?.prop.date.modifiedDate}`
    );
  }
  console.debug(`Enqueue unfinishedTask: [Save] ${propObject.date.modifiedDate}`);
  // Here, current length of unfinishedTasks should be 0 or 1.
  unfinishedTasks.push({ prop: propObject, type: 'Save' });
  // Here, current length of unfinishedTasks is 1 or 2.
  execTask();
};
