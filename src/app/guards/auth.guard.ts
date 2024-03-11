import type { CanActivateFn } from '@angular/router';
import { CommonService } from '../services/common.service';
import {  map } from 'rxjs';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const CF = inject(CommonService)
  return CF.GetLS$(CF.Token, "localStorage").pipe(map(authState => {
    if (!authState || authState == null || authState === 'null') {
      CF.GotoURL('/');
      CF.SwalError('Session Expired.!', 'LOGIN AGAIN');
      return false;
    }
    return true
  }))
};
