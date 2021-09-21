import * as React from 'react';
import {FC} from 'react';
// import styles from './link-to-parent.module.scss';
import {PortalPage} from '../../interfaces';

interface LinkToParentProps {
  parentPage: PortalPage;
}

const LinkToParent: FC<LinkToParentProps> = () => <div>parent</div>;

export {LinkToParent};
