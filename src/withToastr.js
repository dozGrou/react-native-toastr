import React from 'react';
import {ToastrContext} from './ToastrProvider';

export const withToastr = Component => props => (
  <ToastrContext.Consumer>
    {toastr => <Component {...props} toastr={toastr} />}
  </ToastrContext.Consumer>
);
