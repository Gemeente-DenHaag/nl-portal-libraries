import * as React from 'react';
import {Button} from '@gemeente-denhaag/denhaag-component-library';
import {FormattedMessage} from 'react-intl';
import {useContext} from 'react';
import {LayoutContext} from '../../contexts';

const MenuButton = () => {
  const {showMenu} = useContext(LayoutContext);

  return (
    <Button onClick={showMenu}>
      <FormattedMessage id="header.menuButton" />
    </Button>
  );
};
export {MenuButton};
