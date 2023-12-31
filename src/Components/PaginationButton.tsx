import classNames from 'classnames';
import { typographyStyle } from '../CustomStyles/Typography';

interface Props {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const PaginationButton: React.FC<Props> = ({
  children,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        `h-8 w-8 border border-Elements transition-all hover:border-Primary ${typographyStyle.button}`,
        {
          'border-Primary bg-Primary text-white': active,
        },
      )}
    >
      {children}
    </button>
  );
};
