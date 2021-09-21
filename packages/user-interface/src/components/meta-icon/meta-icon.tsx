import * as React from 'react';
import {FC, ReactElement} from 'react';

interface MetaIconProps {
  title: string;
  subtitle: string;
  icon: ReactElement;
}

const MetaIcon: FC<MetaIconProps> = () => <div>icon</div>;
export {MetaIcon};
